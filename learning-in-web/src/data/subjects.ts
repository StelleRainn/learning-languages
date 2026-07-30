// Notebook 原文通过 Vite 的 `?raw` 直接导入项目根目录的数据源。
import pythonNotebook from '../../../Notebook-01-Python.md?raw'
import jsNotebook from '../../../Notebook-02-JavaScript.md?raw'
import swiftNotebook from '../../../Notebook-03-Swift.md?raw'

import { extractTitle } from '@/utils/markdown'

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
  /** Notebook Markdown 原文。 */
  notebook: string
  /** 文档标题（取自首个一级标题）。 */
  title: string
}

const makeTitle = (md: string): string => extractTitle(md) ?? ''

export const subjects: Subject[] = [
  {
    id: 'python',
    name: 'Python',
    tagline: '简洁优雅，无所不在',
    description: '从语法基础到并发、数据模型与工程实践的系统笔记。',
    glyph: '🐍',
    accent: '#3776AB',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 45%, #facc15 100%)',
    light: true,
    notebook: pythonNotebook,
    title: makeTitle(pythonNotebook),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    tagline: '浏览器的通用语言',
    description: '语言核心、异步模型、DOM 与现代工具链。',
    glyph: '🟨',
    accent: '#E8B400',
    gradient: 'linear-gradient(135deg, #111827 0%, #4b5563 55%, #facc15 100%)',
    light: true,
    notebook: jsNotebook,
    title: makeTitle(jsNotebook),
  },
  {
    id: 'swift',
    name: 'Swift',
    tagline: '为 Apple 生态而生',
    description: '类型安全、协议与值类型，构建现代 App。',
    glyph: '🦅',
    accent: '#FA7343',
    gradient: 'linear-gradient(135deg, #b91c1c 0%, #f97316 50%, #fbbf24 100%)',
    light: true,
    notebook: swiftNotebook,
    title: makeTitle(swiftNotebook),
  },
]

const byId = new Map(subjects.map((s) => [s.id, s]))

export function getSubject(id: string | string[]): Subject | undefined {
  return byId.get(Array.isArray(id) ? (id[0] ?? '') : id)
}
