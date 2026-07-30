<script setup lang="ts">
import { computed } from 'vue'
import { activeChapter, type OutlineItem } from '@/utils/markdown'

const props = defineProps<{
  items: OutlineItem[]
  activeId: string | null
}>()

const emit = defineEmits<{ select: [id: string] }>()

/** 当前所在二级章节（含其 H3/H4 子树），随正文滚动自动切换。 */
const chapter = computed(() => activeChapter(props.items, props.activeId))
</script>

<template>
  <nav class="outline outline--section" aria-label="本节目录">
    <div class="outline__head">
      <span class="outline__title">本节目录</span>
    </div>

    <template v-if="chapter">
      <div class="outline__chapter" :title="chapter.text">{{ chapter.text }}</div>

      <ul v-if="chapter.children.length" class="outline__list">
        <li v-for="sub in chapter.children" :key="sub.id" class="outline__node">
          <div
            class="outline__row outline__row--sub"
            :class="{ 'is-active': activeId === sub.id }"
            :title="sub.text"
            @click="emit('select', sub.id)"
          >
            <span class="outline__text">{{ sub.text }}</span>
          </div>

          <ul v-if="sub.children.length" class="outline__sublist">
            <li v-for="grand in sub.children" :key="grand.id" class="outline__node">
              <div
                class="outline__row outline__row--sub"
                :class="{ 'is-active': activeId === grand.id }"
                :title="grand.text"
                @click="emit('select', grand.id)"
              >
                <span class="outline__text">{{ grand.text }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>

      <p v-else class="outline__empty">本节暂无小节</p>
    </template>

    <p v-else class="outline__empty">向下滚动以进入章节</p>
  </nav>
</template>

<!-- 通用 outline 样式已移至全局 main.css，与左侧目录共用 -->
