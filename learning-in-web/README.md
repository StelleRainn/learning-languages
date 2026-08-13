# Learning · 编程学习笔记网站

一个基于 Vue 3 的交互式学习网站，把本仓库的 Markdown Notebook 渲染成带有**章节大纲**和**舒适排版**的在线学习页面。主页采用 Apple 官网风格的大色块布局，每个色块对应一门编程语言；进入某板块后，左侧是类 IDE outline 的可折叠目录，右侧是渲染后的笔记正文。

> **数据源**：仓库根的 `notebooks/*.md`。每个 Notebook 顶部用 YAML frontmatter 声明板块元数据（id / 配色 / 标语 / 图标 / 排序），Vite 在构建期通过 `import.meta.glob` 扫描整目录、解析 frontmatter，自动生成所有板块——**新增一门语言只需往 `notebooks/` 丢一个 `.md`，零代码改动**。

---

## 技术栈

| 关注点 | 选型 | 说明 |
| :--- | :--- | :--- |
| 框架 | Vue 3（`<script setup>` + TS） | 仓库 `pnpm-workspace.yaml` 将 vue 覆盖到 RC（当前 3.6.0-rc.2） |
| 构建 | Vite 8 | dev / build |
| 路由 | vue-router 4 | `createWebHistory`，`/` 与 `/learn/:subject` |
| Markdown | marked 18 | GFM，渲染为 HTML 字符串 |
| 代码高亮 | highlight.js 11 | 仅引入 `/lib/common`（含 python/bash/json/sql…） |
| 包管理 | pnpm | |

---

## 快速开始

```sh
pnpm install      # 安装依赖
pnpm dev          # 启动开发服务器（默认 http://localhost:5173）
pnpm build        # 类型检查 + 生产构建（输出到 dist/）
pnpm type-check   # 仅类型检查（vue-tsc）
pnpm lint         # oxlint + eslint（自动修复）
pnpm format       # prettier 格式化 src/
```

打开 `http://localhost:5173/` 看主页，`http://localhost:5173/learn/python` 直达 Python 板块。

---

## 目录结构

```
learning-in-web/
├── index.html                 # 入口 HTML（标题、lang、meta）
├── vite.config.ts             # 别名 @→src；server.fs.allow 放开上层目录以导入 Notebook
├── pnpm-workspace.yaml        # 将 vue 等覆盖到 RC 版本
├── src/
│   ├── main.ts                # 创建 app、挂载 router、引入全局样式
│   ├── App.vue                # 根布局：AppNav + <RouterView>（带淡入过渡）
│   ├── router/
│   │   └── index.ts           # 路由表：/ 与 /learn/:subject（props:true）
│   ├── assets/
│   │   └── main.css           # 全局样式：设计 token、排版、代码块、布局比例
│   ├── data/
│   │   └── subjects.ts        # import.meta.glob 扫描 ../notebooks/*.md → 动态生成板块
│   ├── utils/
│   │   └── markdown.ts        # frontmatter 解析、marked 渲染、大纲解析、代码块增强
│   ├── components/
│   │   ├── AppNav.vue         # 顶部导航（学习页自动边缘对齐）
│   │   ├── MarkdownContent.vue# 正文渲染 + scrollspy，emit outline/active
│   │   ├── OutlineSidebar.vue # 左侧主目录（仅二级标题“章”）
│   │   └── SectionOutline.vue # 右侧“本节目录”（当前章的 H3/H4，随滚动切换）
│   └── views/
│       ├── HomeView.vue       # Apple 风格主页
│       └── LearnView.vue      # 学习页：编排 侧栏 + 正文，进度条/抽屉
└── ../Notebook-0X-*.md        # 数据源（项目上层目录）
```

---

## 架构与数据流

一条 Notebook 从原文到页面的完整链路：

```
../notebooks/*.md  (Markdown 原文 + 顶部 frontmatter 元数据)
        │  Vite 构建期 import.meta.glob('?raw', eager) 扫描整目录
        ▼
   subjects.ts: 逐篇 parseFrontmatter() → { data: 板块元数据, body: 正文 }
        │  按 data.order 排序 → 组装为 Subject[]
        │  路由 /learn/:subject → LearnView(getSubject(id))
        ▼
   MarkdownContent  ── renderMarkdown(marked.parse) ──▶  HTML 字符串
        │  v-html 挂载到 DOM
        │  nextTick 后做 DOM 后处理：
        │    1) collectOutline()   给 H2~H4 赋 id（sec-N），产出扁平大纲
        │    2) emit('ready', 大纲)  → LearnView 同时驱动两份目录
        │    3) enhanceCodeBlocks() 包裹深色 .code-block + 语言徽标 + hljs 高亮
        │    4) 监听 window scroll → scrollspy → emit('active', id)
        ▼
   LearnView 持有 outline / activeId，分发给：
     · OutlineSidebar（左）—— 仅渲染 H2 章节；高亮 activeChapter(items, activeId)
     · SectionOutline（右）—— 渲染当前 H2 章节的 H3/H4 子树（activeChapter）
   两份目录共享全局 .outline 样式，点击均 scrollIntoView 定位
```

### 关键设计决策

- **DOM 后处理而非 marked 自定义 renderer**
  marked 各大版本 renderer 签名多变。这里只用 `marked.parse` 产出标准 HTML，再在挂载后的真实 DOM 上做增强（高亮、加 id、加语言徽标）。这样既规避 API 漂移，又保证「大纲 id」与「渲染后标题」来自同一棵 DOM、天然一致。

- **`notebooks/` 目录即数据源（glob + frontmatter）**
  Notebook 放仓库根 `notebooks/`，每篇顶部 YAML frontmatter 声明板块元数据。`subjects.ts` 用 `import.meta.glob('../notebooks/*.md', { query:'?raw', eager:true })` 在构建期扫描整目录，`parseFrontmatter` 剥离并解析元数据，正文交给 marked。新增语言 = 丢一个 `.md`，主页色块 / 导航 / 路由全自动出现。`vite.config.ts` 的 `server.fs.allow: ['..']` 放开上层目录边界（构建期 glob 不受此限，仅 dev server 需要）。

- **frontmatter 自解析，不引依赖**
  本站 frontmatter 只用标量键值（字符串/数字/布尔），`markdown.ts` 的 `parseFrontmatter` 用约 30 行正则剥离 `---` 块并解析，无需 gray-matter 等 YAML 库。`renderMarkdown` 收到的是已剥离 frontmatter 的 body，标题 id 等不受影响。

- **outline 与正文一致性**
  大纲不是另写解析器，而是直接 `querySelectorAll('h2,h3,h4')` 取自已渲染 DOM。标题 id 按文档顺序赋值 `sec-0..`，侧栏点击即 `scrollIntoView` 定位。代码块里的 `# 注释` 行因 marked 正确识别代码围栏，不会被误判为标题。

- **左主目录 + 右本节目录（两段式）**
  Python 等大文档章节数极多，若左侧目录展开当前章的子标题，会淹没其它章节。故拆为两段：
  - 左侧 `OutlineSidebar` 仅列 **H2 章节**，扁平、不展开；滚动时高亮“当前所在章”（`activeChapter(items, activeId)`），点击跳转该章。
  - 右侧 `SectionOutline` 展示**当前 H2 章的 H3/H4 子树**，随滚动自动切换章节；sticky 常驻视口；移动端（≤960px）隐藏。
  `activeChapter` 复用 `nestOutline`：在 H2 根树里定位含 activeId 的那一支，返回该章节点（含子树）。

- **sticky 目录常驻视口**
  侧栏单元格必须**拉伸到正文全高**，`position: sticky` 才有滑动空间。因此 `.learn__layout` 用 `align-items: stretch`（切勿改回 `start`，否则侧栏塌缩、目录滚动一段后消失）。

- **布局比例集中可调**
  全局 `:root` 里 4 个 `--learn-*` token 决定学习页横向比例，nav/板块头/目录/正文共用。详见下文「布局细调」。

---

## 如何新增一门语言

**只需往 `notebooks/` 丢一个带 frontmatter 的 `.md`**，主页色块、导航、`/learn/<id>` 路由会自动出现，无需改任何代码。

新建 `notebooks/Notebook-04-Rust.md`，顶部写 frontmatter：

```markdown
---
id: rust
name: Rust
order: 4
glyph: "🦀"
tagline: 内存安全，零成本抽象
description: 所有权、生命周期与并发模型。
accent: "#CE422B"
gradient: "linear-gradient(135deg, #1f1f1f 0%, #b7410e 60%, #f59e0b 100%)"
light: true
---

# Rust

正文从这里开始……
```

frontmatter 字段说明：

| 字段 | 必填 | 说明 |
| :--- | :---: | :--- |
| `id` | ✓ | 板块唯一标识，决定路由 `/learn/<id>` 与导航高亮，建议用小写英文 |
| `name` | ✓ | 显示名（导航、色块标题） |
| `order` |   | 主页/导航排序，数字越小越靠前；缺省按 `id` 字母序 |
| `glyph` |   | 一个 Emoji 图标 |
| `tagline` |   | 色块副标题 |
| `description` |   | 色块简短描述 |
| `accent` |   | 主题色（CSS 颜色），用于学习页强调 |
| `gradient` |   | 主页色块背景渐变（CSS gradient） |
| `light` |   | `true` 表示色块背景偏深、文字用浅色 |

正文里的首个 `# 标题` 会作为文档标题（学习页大标题与浏览器标签）。`id` 与标题可不同（如 `id: python` 但标题 `# Python 3`）。

> dev server 运行时往 `notebooks/` 加文件，Vite 会自动重扫并热更新；构建时则打包进 bundle。

---

## 布局细调（学习页横向比例）

**唯一入口：`src/assets/main.css` 的 `:root` 块。** 改这里，nav / 板块头 / 主目录 / 正文 / 本节目录会同时变化。

学习页为 3 列网格：`主目录 | 正文 | 本节目录`，外加左右留白：

```css
--learn-pad:     clamp(120px, 15vw, 320px);  /* 左留白：nav/目录/正文共同左对齐 */
--learn-side:    clamp(160px, 15vw, 300px);  /* 左侧主目录（仅 H2 章节）*/
--learn-gap:     clamp(20px, 2.5vw, 48px);   /* 各列间距 */
--learn-toc:     clamp(180px, 14vw, 240px);  /* 右侧“本节目录”（当前章 H3/H4）*/
--learn-reserve: clamp(80px, 10vw, 180px);   /* 右留白：nav/板块头/本节目录共同右对齐 */
```

- **正文宽度 = 视口 − 这 5 个值之和**（自动得出，无独立参数）。
- 想加宽正文 → 减小 `--learn-pad` 或 `--learn-reserve`。
- 想让本节目录更宽 → 增大 `--learn-toc`（通常同时减小 `--learn-reserve`，正文宽度即可保持不变）。
- 想让主目录更窄 → 减小 `--learn-side`。
- `clamp(最小, 首选, 最大)`：小屏取最小、大屏取最大、中间随 `vw` 缩放；可各自调整或改定值（如 `--learn-toc: 220px`）。
- 顶栏在**学习页**会自动用相同的 `--learn-pad` / `--learn-reserve` 对齐（首页仍居中）。

> 说明：右留白 `--learn-reserve` 在加入“本节目录”后由原先 30vw 收窄到 10vw，把腾出的空间让给了 `--learn-toc`；正文宽度基本未变。

---

## 已知事项与后续方向

- **首屏体积**：所有 Notebook 经 `import.meta.glob({ eager: true })` 内联进主 chunk（当前 gzip ≈ 104KB）。数据层已天然支持懒加载——去掉 `eager`、把 `subjects` 拆成“清单 + 按需动态 `import()`”，即可让主页只加载元数据、点进板块才加载该篇正文。
- **移动端小节导航**：窄屏（≤960px）右侧“本节目录”隐藏，抽屉内仅保留 H2 章节列表；如需在小屏也浏览 H3/H4，可在抽屉中改为嵌套树（给 `OutlineSidebar` 加 `variant`）。
- **行宽**：正文当前填满中列。若觉得纯文字行偏长，可给 `.md-content` 的段落/标题加 `max-width`（代码块与表格保持满宽）。
- **代码高亮性能**：Python 板块约 368 个代码块，首屏同步高亮约 100ms 级，可按需改为 `requestIdleCallback` 分片。
