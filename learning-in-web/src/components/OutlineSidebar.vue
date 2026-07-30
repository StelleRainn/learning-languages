<script setup lang="ts">
import { computed } from 'vue'
import { activeChapter, type OutlineItem } from '@/utils/markdown'

const props = defineProps<{
  items: OutlineItem[]
  activeId: string | null
  title: string
}>()

const emit = defineEmits<{ select: [id: string] }>()

/** 仅展示二级标题（章节），保持目录精简；小节（H3/H4）由右侧“本节目录”承载。 */
const chapters = computed(() => props.items.filter((it) => it.level === 2))

/** 当前激活标题所属的 H2 id，用于在扁平列表中高亮“当前所在章节”。 */
const activeChapterId = computed(
  () => activeChapter(props.items, props.activeId)?.id ?? null,
)
</script>

<template>
  <nav class="outline" aria-label="章节大纲">
    <div class="outline__head">
      <span class="outline__title">{{ title }}</span>
      <span class="outline__count">{{ chapters.length }} 章</span>
    </div>

    <ul class="outline__list">
      <li v-for="ch in chapters" :key="ch.id" class="outline__node">
        <div
          class="outline__row"
          :class="{ 'is-active': activeChapterId === ch.id }"
          :title="ch.text"
          @click="emit('select', ch.id)"
        >
          <span class="outline__text">{{ ch.text }}</span>
        </div>
      </li>
    </ul>
  </nav>
</template>

<!-- 通用 outline 样式已移至全局 main.css，左右两个大纲共用以保证视觉一致 -->
