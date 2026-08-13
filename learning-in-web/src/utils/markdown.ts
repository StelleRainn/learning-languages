import { marked } from 'marked'
import hljs from 'highlight.js/lib/common'

// GFM 表格、删除线、任务列表等默认开启；同步渲染返回字符串。
marked.setOptions({
  gfm: true,
  breaks: false,
})

/** 将 Markdown 原文渲染为 HTML 字串。 */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string
}

/** Notebook 顶部可携带的板块元数据（YAML frontmatter）。 */
export interface NotebookMeta {
  id: string
  name: string
  order?: number
  glyph?: string
  tagline?: string
  description?: string
  accent?: string
  gradient?: string
  light?: boolean
}

export interface ParsedNotebook {
  /** frontmatter 元数据；无 frontmatter 时为空对象。 */
  data: Partial<NotebookMeta>
  /** 去掉 frontmatter 后的正文。 */
  body: string
}

/**
 * 剥离并解析 Notebook 顶部的 YAML frontmatter（--- ... --- 包裹）。
 * 只支持本站用到的“标量键值”形式（字符串/数字/布尔），不引依赖。
 * 无 frontmatter 时 data 为空、body 为原文。
 */
export function parseFrontmatter(src: string): ParsedNotebook {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src)
  if (!m) return { data: {}, body: src }
  const raw = m[1]!
  const body = src.slice(m[0].length)
  const data: Record<string, unknown> = {}
  for (const line of raw.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue
    const idx = line.indexOf(':')
    if (idx < 0) continue
    const key = line.slice(0, idx).trim()
    let val: string = line.slice(idx + 1).trim()
    // 去掉成对的双引号/单引号包裹
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    data[key] = parseScalar(val)
  }
  return { data: data as Partial<NotebookMeta>, body }
}

/** 把 frontmatter 字面量解析为标量：true/false/数字/否则字符串。 */
function parseScalar(val: string): unknown {
  if (val === 'true') return true
  if (val === 'false') return false
  if (/^-?\d+(\.\d+)?$/.test(val)) return Number(val)
  return val
}

/** 从 Markdown 中提取首个一级标题文本，作为文档标题。 */
export function extractTitle(md: string): string | null {
  const lines = md.split('\n')
  let inFence = false
  for (const line of lines) {
    if (/^\s{0,3}```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = /^#\s+(.+?)\s*$/.exec(line)
    if (m) return m[1]!.trim()
  }
  return null
}

/** 规范化代码块语言标签，映射为 highlight.js 支持的语言名；返回空串表示不高亮。 */
function normalizeLang(lang: string): string {
  const l = lang.trim().toLowerCase()
  if (!l) return ''
  // 这些语言无需（或无法）语法高亮，按普通文本展示。
  if (['text', 'txt', 'plaintext', 'plain', 'csv', 'gitignore', 'log'].includes(l)) return ''
  const alias: Record<string, string> = {
    toml: 'ini',
    sh: 'bash',
    shell: 'bash',
    py: 'python',
    'py3': 'python',
    ps1: 'powershell',
    powershell: 'powershell',
    ts: 'typescript',
    js: 'javascript',
  }
  return alias[l] ?? l
}

/**
 * 对容器内所有代码块做语法高亮，并包裹语言标签栏，使代码块与正文视觉区分明显。
 * 在 v-html 内容挂载到 DOM 后调用。
 */
export function enhanceCodeBlocks(root: HTMLElement): void {
  const blocks = root.querySelectorAll<HTMLPreElement>('pre')
  blocks.forEach((pre) => {
    if (pre.parentElement?.classList.contains('code-block')) return

    const code = pre.querySelector('code')
    const langClass = Array.from(code?.classList ?? []).find((c) => c.startsWith('language-'))
    const rawLang = langClass?.slice('language-'.length) ?? ''
    const lang = normalizeLang(rawLang)

    if (code && lang && hljs.getLanguage(lang)) {
      // highlight.js 会依据 class 重新着色；先清掉其缓存标记。
      code.removeAttribute('data-highlighted')
      code.classList.add(`language-${lang}`)
      hljs.highlightElement(code)
    }

    // 用结构化容器包裹，附带语言徽标，强化“代码块”的视觉独立感。
    const wrapper = document.createElement('div')
    wrapper.className = 'code-block'
    pre.replaceWith(wrapper)
    wrapper.appendChild(pre)

    if (lang) {
      const badge = document.createElement('span')
      badge.className = 'code-block__lang'
      badge.textContent = lang
      wrapper.appendChild(badge)
    }
  })
}

export interface OutlineItem {
  id: string
  level: number
  text: string
  index: number
}

export interface OutlineNode extends OutlineItem {
  children: OutlineNode[]
}

/**
 * 收集容器内 H2~H4 标题，赋予稳定 id（供大纲锚定与滚动高亮），返回扁平列表。
 * 一级标题（文档标题）不进入大纲。
 */
export function collectOutline(root: HTMLElement): OutlineItem[] {
  const headings = root.querySelectorAll<HTMLElement>('h2, h3, h4')
  const items: OutlineItem[] = []
  headings.forEach((h, i) => {
    const id = `sec-${i}`
    h.id = id
    const text = h.textContent ?? ''
    h.setAttribute('data-outline-text', text)
    items.push({ id, level: Number(h.tagName.substring(1)), text, index: i })
  })
  return items
}

/** 将扁平大纲列表按层级组织为树形结构（供侧边栏渲染可折叠节点）。 */
export function nestOutline(items: OutlineItem[]): OutlineNode[] {
  const roots: OutlineNode[] = []
  const stack: OutlineNode[] = []
  for (const it of items) {
    const node: OutlineNode = { ...it, children: [] }
    while (stack.length > 0 && stack[stack.length - 1]!.level >= node.level) stack.pop()
    if (stack.length > 0) {
      stack[stack.length - 1]!.children.push(node)
    } else {
      roots.push(node)
    }
    stack.push(node)
  }
  return roots
}

/**
 * 找出当前激活标题所属的二级章节（H2），返回该章节节点（含其 H3/H4 子树）。
 * 用于：左侧目录高亮“当前所在章节”、右侧“本节目录”展示该章节的小节。
 * 若激活标题位于首个 H2 之前（如文档开头的引言），返回 null。
 */
export function activeChapter(items: OutlineItem[], activeId: string | null): OutlineNode | null {
  if (!activeId) return null
  const tree = nestOutline(items) // 根节点即各 H2 章节
  const contains = (node: OutlineNode): boolean =>
    node.id === activeId || node.children.some(contains)
  return tree.find((root) => contains(root)) ?? null
}
