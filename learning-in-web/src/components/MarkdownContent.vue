<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  collectOutline,
  enhanceCodeBlocks,
  renderMarkdown,
  type OutlineItem,
} from '@/utils/markdown'

const props = defineProps<{ markdown: string }>()
const emit = defineEmits<{
  ready: [items: OutlineItem[]]
  active: [id: string | null]
}>()

const root = ref<HTMLElement | null>(null)
const html = computed(() => renderMarkdown(props.markdown))

let headings: HTMLElement[] = []
let ticking = false

/** 处理已挂载的 DOM：先收集大纲（侧边栏即时可用），再增强代码块（较重）。 */
function processDom() {
  const el = root.value
  if (!el) return
  const items = collectOutline(el)
  headings = Array.from(el.querySelectorAll<HTMLElement>('h2, h3, h4'))
  emit('ready', items)
  updateActive()
  enhanceCodeBlocks(el)
}

/** 滚动监听：取距离视口顶部最近、且尚未滚出的最后一个标题作为当前章节。 */
function updateActive() {
  const threshold = 120 // 约等于导航栏高度 + 一段呼吸距离
  let current: string | null = null
  for (const h of headings) {
    if (h.getBoundingClientRect().top - threshold <= 0) {
      current = h.id
    } else {
      break
    }
  }
  // 滚到顶部之前默认高亮首个章节
  if (!current && headings.length > 0) {
    current = headings[0]!.id
  }
  emit('active', current)
}

function onScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(() => {
    updateActive()
    ticking = false
  })
}

onMounted(() => {
  nextTick(processDom)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

// 切换板块时重新处理 DOM
watch(html, () => nextTick(processDom))
</script>

<template>
  <div ref="root" class="md-content" v-html="html"></div>
</template>
