<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MarkdownContent from '@/components/MarkdownContent.vue'
import OutlineSidebar from '@/components/OutlineSidebar.vue'
import SectionOutline from '@/components/SectionOutline.vue'
import { getSubject } from '@/data/subjects'
import type { OutlineItem } from '@/utils/markdown'

const props = defineProps<{ subject: string }>()

const subject = computed(() => getSubject(props.subject))

const outlineItems = ref<OutlineItem[]>([])
const activeId = ref<string | null>(null)
const progress = ref(0)
const sidebarOpen = ref(false)

function onReady(items: OutlineItem[]) {
  outlineItems.value = items
  activeId.value = items[0]?.id ?? null
}

function onActive(id: string | null) {
  activeId.value = id
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  sidebarOpen.value = false
}

function onSelect(id: string) {
  scrollToSection(id)
}

/* 阅读进度条 */
function updateProgress() {
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

function onScroll() {
  window.requestAnimationFrame(updateProgress)
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

// 更新浏览器标签标题
watch(
  subject,
  (s) => {
    document.title = s ? `${s.title} · Learning` : 'Learning · 编程学习笔记'
  },
  { immediate: true },
)

// 切换板块时回到顶部
watch(
  () => props.subject,
  () => {
    window.scrollTo({ top: 0 })
  },
)
</script>

<template>
  <div v-if="subject" class="learn">
    <!-- 阅读进度条 -->
    <div class="progress" :style="{ transform: `scaleX(${progress})` }"></div>

    <!-- 板块头 -->
    <header class="learn__head" :style="{ '--accent': subject.accent }">
      <div class="learn__head-inner">
        <div class="learn__crumb">
          <RouterLink to="/" class="learn__back">首页</RouterLink>
          <span class="learn__sep">/</span>
          <span class="learn__subject">{{ subject.name }}</span>
        </div>
        <h1 class="learn__title">
          <span class="learn__glyph">{{ subject.glyph }}</span>
          {{ subject.title }}
        </h1>
        <p class="learn__tagline">{{ subject.tagline }}</p>
      </div>
    </header>

    <!-- 移动端目录开关 -->
    <button class="toc-toggle" :class="{ 'is-open': sidebarOpen }" @click="sidebarOpen = !sidebarOpen">
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      {{ sidebarOpen ? '收起目录' : '目录' }}
    </button>

    <div class="learn__layout">
      <aside class="learn__aside" :class="{ 'is-open': sidebarOpen }">
        <OutlineSidebar
          :items="outlineItems"
          :active-id="activeId"
          :title="subject.name + ' 目录'"
          @select="onSelect"
        />
      </aside>

      <div class="learn__main">
        <MarkdownContent :markdown="subject.notebook" @ready="onReady" @active="onActive" />
        <div class="learn__end">
          <RouterLink to="/">← 返回首页</RouterLink>
        </div>
      </div>

      <!-- 右侧：本节目录（当前二级章节的小节，随滚动自动切换；桌面端常驻） -->
      <aside class="learn__toc">
        <SectionOutline :items="outlineItems" :active-id="activeId" @select="onSelect" />
      </aside>
    </div>

    <!-- 移动端遮罩 -->
    <div v-if="sidebarOpen" class="learn__scrim" @click="sidebarOpen = false"></div>
  </div>

  <div v-else class="missing">
    <div class="container">
      <h1>未找到该学习板块</h1>
      <p>可能链接有误，该方向尚未上线。</p>
      <RouterLink class="btn btn--primary" to="/">返回首页</RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* 进度条 ----------------------------------------------------------------- */
.progress {
  position: fixed;
  top: var(--nav-height);
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-accent);
  transform-origin: 0 50%;
  transform: scaleX(0);
  z-index: 99;
}

/* 板块头 ----------------------------------------------------------------- */
.learn__head {
  padding: 40px 0 28px;
  border-bottom: 1px solid var(--color-border-soft);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--accent) 7%, transparent), transparent 80%),
    var(--color-bg);
}
.learn__head-inner {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: var(--learn-pad);
  padding-right: var(--learn-reserve);
}
.learn__crumb {
  font-size: 13px;
  color: var(--color-text-4);
  display: flex;
  align-items: center;
  gap: 8px;
}
.learn__back:hover {
  color: var(--color-accent);
}
.learn__sep {
  opacity: 0.5;
}
.learn__subject {
  color: var(--color-text-3);
}
.learn__title {
  font-size: clamp(1.9rem, 4.5vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.1;
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 6px;
}
.learn__glyph {
  font-size: 0.85em;
  filter: drop-shadow(0 4px 10px rgba(0 0 0 / 0.15));
}
.learn__tagline {
  color: var(--color-text-3);
  font-size: 17px;
  margin-top: 4px;
}

/* 布局 ------------------------------------------------------------------- */
.learn__layout {
  display: grid;
  grid-template-columns: var(--learn-side) minmax(0, 1fr) var(--learn-toc);
  column-gap: var(--learn-gap);
  /* 左侧贴近边缘保留呼吸；右侧预留留白供与 nav/板块头共同对齐 */
  padding-left: var(--learn-pad);
  padding-right: var(--learn-reserve);
  padding-top: 32px;
  padding-bottom: 80px;
  /* 关键：stretch 让侧栏单元格拉伸到正文全高，sticky 目录才能在视口内常驻 */
  align-items: stretch;
}

.learn__aside {
  position: relative;
  min-width: 0;
}

.learn__main {
  min-width: 0; /* 允许内容收缩，防止代码块撑破网格；宽度由布局 token 决定 */
}

/* 右侧本节目录列：与左侧目录同为 sticky，常驻视口 */
.learn__toc {
  position: relative;
  min-width: 0;
}

.learn__end {
  margin-top: 64px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border-soft);
  font-size: 14px;
}
.learn__end a {
  color: var(--color-link);
}
.learn__end a:hover {
  text-decoration: underline;
}

/* 移动端目录开关（默认隐藏，窄屏显示） */
.toc-toggle {
  display: none;
  position: fixed;
  right: 18px;
  bottom: 24px;
  z-index: 60;
  align-items: center;
  gap: 6px;
  padding: 11px 16px;
  border-radius: 980px;
  border: none;
  background: var(--color-text);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  box-shadow: var(--shadow-lg);
}

/* 缺失板块 --------------------------------------------------------------- */
.missing {
  padding: 120px 0;
  text-align: center;
}
.missing h1 {
  font-size: 2rem;
  margin-bottom: 12px;
}
.missing p {
  color: var(--color-text-3);
  margin-bottom: 24px;
}

/* 响应式 ----------------------------------------------------------------- */
@media (max-width: 960px) {
  .toc-toggle {
    display: inline-flex;
  }
  /* 窄屏取消左右预留，改用对称小内边距 */
  .learn__head-inner,
  .learn__layout {
    padding-left: 20px;
    padding-right: 20px;
  }
  .learn__layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
  /* 窄屏无空间承载右侧本节目录，隐藏；小节导航退化为滚动浏览 */
  .learn__toc {
    display: none;
  }
  .learn__aside {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    bottom: 0;
    width: 300px;
    max-width: 84vw;
    background: var(--color-surface);
    border-right: 1px solid var(--color-border-soft);
    box-shadow: var(--shadow-lg);
    transform: translateX(-100%);
    transition: transform 0.28s var(--ease);
    z-index: 70;
    padding: 12px 12px 24px;
    overflow-y: auto;
  }
  .learn__aside.is-open {
    transform: translateX(0);
  }
  .learn__main {
    max-width: 100%;
  }
  .learn__scrim {
    position: fixed;
    inset: var(--nav-height) 0 0 0;
    background: rgba(0 0 0 / 0.4);
    z-index: 65;
  }
}

@media (max-width: 640px) {
  .learn__head {
    padding: 28px 0 20px;
  }
  .container {
    padding-inline: 16px;
  }
}
</style>
