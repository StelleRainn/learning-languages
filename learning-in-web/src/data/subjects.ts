// Notebook 数据源：仓库根 `notebooks/*.md`。
// 由 Vite 在构建期通过 `import.meta.glob` 扫描整目录，逐个解析 frontmatter 元数据，
// 动态生成板块。新增一门语言 = 往 notebooks/ 丢一个带 frontmatter 的 .md，零代码改动。
import { extractTitle, parseFrontmatter, type NotebookMeta } from '@/utils/markdown'

/** 单个学习板块的元数据（主页色块 + 学习页配置）。 */
export interface Subject {
  id: string
  name: string
  /** 主页大色块的副标题。 */
  tagline: string
  /** 主页色块的简短描述。 */
  description: string
  /** 一个 Emoji，用于无图标时的轻量标识。 */
  glyph: string
  /** 主题色（CSS 颜色），用于色块、强调、学习页配色。 */
  accent: string
  /** 主页色块的背景渐变（CSS gradient）。 */
  gradient: string
  /** 色块文字为浅色时设为 true（深色背景）。 */
  light: boolean
  /** Notebook Markdown 正文（已剥离 frontmatter）。 */
  notebook: string
  /** 文档标题（取自正文首个一级标题）。 */
  title: string
  /** 数据源文件相对路径，用于调试。 */
  source: string
}

// eager: 构建期把每篇 Notebook 内联进 bundle（与改造前体积一致）。
// 后续若要按板块懒加载以减小首屏，去掉 eager、改写为动态 import() 即可。
// glob 的相对路径相对「本源文件」解析：src/data → ../../../ = 仓库根（notebooks 所在）。
// 不用 import:'default'：它与 query:'?raw' + eager 组合在 dev/build 下取值形态不一致
// （dev 直接给字符串、build 给模块对象）。走标准模块对象后取 mod.default 两端一致。
const modules = import.meta.glob<{ default: string }>('../../../notebooks/*.md', {
  query: '?raw',
  eager: true,
})

type Parsed = { source: string; data: Partial<NotebookMeta>; body: string }

/** 扫描 → 解析 frontmatter（每篇仅一次） → 按 order 排序 → 组装为板块。 */
const parsed: Parsed[] = Object.entries(modules).map(([source, mod]) => {
  const { data, body } = parseFrontmatter(mod.default)
  return { source, data, body }
})

const ordered = [...parsed].sort((a, b) => {
  const oa = a.data.order
  const ob = b.data.order
  // 有 order 的在前、按 order 升序；同为空则按 id 字母序（稳定兜底）。
  if (oa != null && ob != null) return oa - ob
  if (oa != null) return -1
  if (ob != null) return 1
  return (a.data.id ?? a.source).localeCompare(b.data.id ?? b.source)
})

function toSubject({ source, data, body }: Parsed): Subject {
  const id = data.id ?? source.split('/').pop()!.replace(/\.md$/, '')
  return {
    id,
    name: data.name ?? id,
    tagline: data.tagline ?? '',
    description: data.description ?? '',
    glyph: data.glyph ?? '📘',
    accent: data.accent ?? '#0071e3',
    gradient: data.gradient ?? 'linear-gradient(135deg, #1d1d1f 0%, #424245 100%)',
    light: data.light ?? false,
    notebook: body,
    title: extractTitle(body) ?? data.name ?? id,
    source,
  }
}

export const subjects: Subject[] = ordered.map(toSubject)

const byId = new Map(subjects.map((s) => [s.id, s]))

export function getSubject(id: string | string[]): Subject | undefined {
  return byId.get(Array.isArray(id) ? (id[0] ?? '') : id)
}
