# 迭代日志

## v1 · 2026-07-30 — 主页 + Python 学习板块（首版）

### 目标
把空白 Vue 项目改造为学习网站：Apple 风格主页（不同色块对应不同语言），点击进入学习板块后左侧为类 IDE outline 的章节目录、右侧为舒适排版的笔记正文，代码块特殊处理。数据源直接用本仓库的 Notebook。本轮聚焦主页 + Python。

### 交付内容

**依赖**：新增 `vue-router@4`、`marked@18`、`highlight.js@11`（runtime）。

**路由与根布局**
- `src/router/index.ts`：`/`（主页）、`/learn/:subject`（学习页，`props: true`），未匹配重定向到首页。
- `src/main.ts`：挂载 router，引入全局样式。
- `src/App.vue`：`AppNav` + `<RouterView>`（带淡入过渡），按路由计算当前板块用于导航高亮。

**数据层**
- `src/data/subjects.ts`：Python / JavaScript / Swift 三块元数据，`?raw` 导入上层目录 Notebook，提取首标题作为文档标题。
- `vite.config.ts`：新增 `server.fs.allow: ['..']`，允许 dev server 跨目录读取 Notebook。

**Markdown 管线**（`src/utils/markdown.ts`）
- `renderMarkdown`：marked 18 GFM 渲染为 HTML。
- `enhanceCodeBlocks`：把 `<pre>` 包裹成深色 `.code-block` + 语言徽标，并对已知语言执行 `hljs.highlightElement`；`text/csv/gitignore` 等按纯文本处理。
- `collectOutline` / `nestOutline`：从已渲染 DOM 取 H2~H4、赋 `sec-N` id、组织为树。

**主页**（`src/views/HomeView.vue`）
- 半透明毛玻璃导航、居中 Hero、Python 全宽大色块 + JS/Swift 双栏色块（巨型水印字 + 渐变 + 悬浮动效）、特性区、页脚。

**学习页**（`src/views/LearnView.vue` + `MarkdownContent.vue` + `OutlineSidebar.vue`）
- 左侧可折叠大纲树（H2/H3/H4），滚动自动高亮当前章节并展开其路径，点击平滑定位。
- 正文宽松排版（行高 1.78），代码块深色独立、与正文强区分。
- 顶部阅读进度条；窄屏（≤960px）侧栏转为抽屉 + 浮动「目录」按钮。

### 迭代中的优化（同日，两轮）

1. **目录不固定**：根因是 `.learn__layout` 的 `align-items: start` 让侧栏网格单元塌缩，`sticky` 无滑动空间。改为 `stretch` 后目录常驻视口。
2. **横向比例**：
   - 先改为全宽布局、5%:10%:70%:15%，移除居中 `.container` 与正文 760px 硬上限；nav 未对齐。
   - 进一步改为 **15%:15%:~50%:20%**，并把 4 个比例参数集中到全局 `:root`（`--learn-*`），nav 在学习页自动边缘对齐（首页仍居中），加 0.25s 过渡、窄屏回退 20px。
   - 当前 token 值（可随时在 `src/assets/main.css` 调）：
     `--learn-pad 15vw` · `--learn-side 15vw` · `--learn-gap 2.5vw` · `--learn-reserve 30vw`。

### 验证
- `pnpm type-check` ✅、`pnpm build` ✅（91 模块）。
- dev 模式全部组件转换 200、HMR 无报错、SPA 路由回退正常。
- Node 实测：真实 Python Notebook（118KB）marked 解析 47ms；366 个可高亮代码块 highlight.js 68ms。
- 解析正确：25 H2 / 190 H3 / 67 H4，代码块内 `# 注释` 未被误判为标题。

### 备注
- 因环境无浏览器自动化，视觉以逻辑/构建验证为准；sticky 修复与布局参数为确定性改动。
- 首屏主 chunk gzip ≈ 220KB（三份 Notebook 内联 + highlight.js）；后续可按板块懒加载 Notebook 优化。

### 后续候选
- Notebook 按板块懒加载，减小首屏。
- 右侧预留区接入评论 / 笔记。
- 给正文纯文字段落加 `max-width`（代码块/表格保持满宽）兼顾行长可读性。
- JS / Swift 板块内容校对与配色细化。

---

## v2 · 2026-07-30 — 目录拆为“左主目录 + 右本节目录”

### 背景
Python 等大文档章节数极多（25 章 / 282 个标题）。原左侧目录会在滚动时自动展开当前章的子标题，导致其余大章被淹没、难以跳转。

### 改动
1. **左侧主目录收窄为仅 H2 章节**（`OutlineSidebar.vue`）：扁平、不再展开/折叠；滚动时高亮“当前所在章”，点击跳转该章。删除了原先的展开折叠逻辑（`userToggled` / `activePath` / chevron）。
2. **新增右侧“本节目录”**（`SectionOutline.vue`）：展示当前 H2 章的 H3/H4 子树，随滚动自动切换章节；与左侧同为 sticky、常驻视口、共用样式。窄屏（≤960px）隐藏。
3. **新增 `activeChapter(items, activeId)`**（`markdown.ts`）：复用 `nestOutline`，在 H2 根树中定位含 activeId 的那一支，返回该章节点（含子树）。左侧用于高亮、右侧用于取子树。
4. **样式下沉到全局**：把原先 `OutlineSidebar` 的 scoped outline 样式移至 `main.css`，左右两份目录共用 `.outline__*`，保证“样式行为一致”。新增 `.outline__chapter`（右侧当前章标题）、`.outline__empty`（空态）。
5. **布局改为 3 列网格**：`主目录 | 正文 | 本节目录`。

### 布局 token 调整（`src/assets/main.css`）
- 新增 `--learn-toc: clamp(180px, 14vw, 240px)`（本节目录宽度）。
- `--learn-reserve` 由 `clamp(120px, 30vw, 720px)` 收窄为 `clamp(80px, 10vw, 180px)`，把空间让给本节目录。
- `--learn-gap` 由 `gap` 改为 `column-gap`（单行网格，等价）。
- 结果：正文宽度基本未变；本节目录右缘与 nav / 板块头右缘对齐。

### 验证
- `pnpm type-check` ✅、`pnpm build` ✅（92 模块，较 v1 +1 个组件）。
- dev 模式 `/learn/python` 返回 200、HMR 正常。

### 备注
- 移动端抽屉目前仅列 H2 章节（与桌面左侧一致）；小屏下的 H3/H4 浏览为已知限制，后续可给 `OutlineSidebar` 加 `variant` 在抽屉里切回嵌套树。
- 仍无浏览器自动化，视觉以构建/逻辑验证为准；sticky 与 grid 列为确定性改动。

---

## v2.1 · 2026-08-01 — 本节目录标题层级化

### 背景
v2 拆出右侧“本节目录”后，其 H3/H4 视觉上完全扁平，看不出层级。

### 根因
原缩进规则 `.outline__sublist .outline__sublist .outline__row { padding-left: 26px }` 是为左侧三层树（H2/H3/H4 = 顶层/一级/二级 sublist）设计的。本节目录从 H3 起，H4 处于**一级** sublist，拿不到那条 26px 缩进；且 H3/H4 同用 `.outline__row--sub`，padding-left 都是 14px、字号仅 14→13、颜色相同 —— 故无区分。

### 改动
- `SectionOutline.vue`：H3 行改 `outline__row--h3`、H4 行改 `outline__row--h4`（语义化类，替代泛化的 `--sub`，避免与激活态的 CSS 特性竞赛）。
- `main.css` 新增 `.outline--section` 作用域的层级阶梯：
  - **H3**（小节）：13.5px / 字重 560 / `--color-text-2` / 顶部 8px 分组间距。
  - **H4**（细分）：12.5px / `--color-text-4`；整组 `.outline__sublist` 加**左侧引导竖线**（`border-left`）+ 缩进，挂在父 H3 之下。
  - 阶梯：字号 14→13.5→12.5、字重 600→560→400、颜色 text→text-2→text-4、缩进 0→0→深+竖线。
- 顺手补齐 `.outline__chapter` 的标准 `line-clamp`（原先仅有 `-webkit-` 前缀）。

### 验证
- `pnpm build` ✅（含 type-check；CSS 9.87→10.32 KB）。
- 特性核对：层级规则与激活态同为 (0,2,0)，靠源顺序保证激活态在后胜出，点击高亮不受影响。

---

## v3 · 2026-08-13 — notebooks/ 目录化 + frontmatter，板块全自动生成

### 目标
把散落在仓库根的 Notebook 收拢进 `notebooks/`，并让 Vue 项目把该目录当作 source：扫描每个 `.md`、解析其 frontmatter 元数据，动态生成对应板块。新增一门语言不再改代码。

### 关键决策（与用户确认）
- **位置**：仓库根 `notebooks/`（笔记作为仓库级共享资源，web 是消费者；沿用 `fs.allow:['..']`）。
- **元数据来源**：每个笔记顶部 YAML frontmatter（Obsidian Properties 原生友好），而非独立清单或推断。

### 改动
- 迁移：`git mv` 三份 `Notebook-0X-*.md` 进 `notebooks/`，各加 frontmatter（id/name/order/glyph/tagline/description/accent/gradient/light），值沿用原 `subjects.ts` 手写值。
- `markdown.ts`：新增 `parseFrontmatter(src) → { data, body }`，约 30 行正则剥离 `---` 块、解析标量（字符串/数字/布尔、去引号），不引依赖；`renderMarkdown` 收到的已是剥离 frontmatter 的 body。
- `subjects.ts` 重写：`import.meta.glob('../notebooks/*.md', { query:'?raw', import:'default', eager:true })` 扫描整目录 → 每篇 `parseFrontmatter` 一次 → 按 `order` 排序 → 组装 `Subject[]`。`Subject` 接口不变，UI 零改动；新增 `source` 字段便于调试。

### 遇到的问题
- `vue-tsc` 两处：① `Object.entries(modules)` 的值类型仍是 `{default:string}` 而非 `string`（即使指定 `import:'default'`，TS 不窄化）→ 改取 `mod.default`；② 返回对象漏写 `light` 字段 → 补 `light: data.light ?? false`。Vite build 本身都通过，仅类型检查拦下。
- **运行时白屏（glob 路径）**：初版 glob 写 `'../notebooks/*.md'`，但 glob 相对路径相对**源文件**解析（subjects.ts 在 `src/data/`）→ 实际指向 `src/notebooks/`（不存在）→ 匹配为空 → `subjects: []`（不报错，build/dev 都"通过"，但首页无板块、`/learn/*` 全部"未找到"）。改 `'../../../notebooks/*.md'` 修复。教训：空匹配静默成功，改 glob 路径后必须额外核对匹配数。
- **运行时崩溃（glob 取值形态）**：`{ query:'?raw', import:'default', eager:true }` 三者组合下，dev 把每个匹配项直接赋为字符串、build 则赋为模块对象——形态不一致。代码 `mod.default` 在 dev 取到 undefined → `extractTitle(undefined)` 崩。去掉 `import:'default'`，改走标准模块对象（dev 用 `import * as` 命名空间、`.default` 即字符串），两端一致。教训：`import:'default'` 与 `query` + `eager` 叠用时形态不稳，优先用默认模块对象。

### 验证
- `pnpm type-check` ✅、`pnpm build` ✅（89 模块）。
- dev 运行时 `/`、`/learn/python`、`/learn/javascript`、`/learn/swift` 均 200，无报错。
- **意外红利**：主 chunk gzip **220KB → 104KB**（近乎减半）。根因是 glob 的 `import:'default'` 让 chunk 划分比原先三条裸 `?raw` 导入更优，highlight.js 等被更好拆分。

### 备注
- 数据层现天然支持懒加载：去掉 `eager` + `subjects` 拆“清单 + 动态 import()”即可让主页只载元数据。本轮保持 eager，体积已大降，暂不需要。
- frontmatter 仅支持标量键值；若将来需要列表（如多标签），再引 gray-matter 或扩展解析器。
- README「如何新增一门语言」已从“改 3 处代码”改写为“丢一个 .md”，含字段说明表。
