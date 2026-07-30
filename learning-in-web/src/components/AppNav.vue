<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { subjects } from '@/data/subjects'

const props = defineProps<{
  /** 当前所在板块 id，用于高亮导航项。 */
  activeSubject?: string
}>()

/** 学习页采用边缘对齐布局（与目录左缘、正文右缘对齐）；首页保持居中。 */
const edge = computed(() => Boolean(props.activeSubject))
</script>

<template>
  <header class="nav">
    <div class="nav__inner" :class="edge ? 'nav__inner--edge' : 'container'">
      <RouterLink to="/" class="nav__brand" aria-label="返回首页">
        <span class="nav__logo">{ }</span>
        <span class="nav__title">Learning</span>
      </RouterLink>

      <nav class="nav__links" aria-label="主导航">
        <RouterLink to="/" class="nav__link" :class="{ 'is-active': $route.name === 'home' }">
          首页
        </RouterLink>
        <RouterLink
          v-for="s in subjects"
          :key="s.id"
          :to="{ name: 'learn', params: { subject: s.id } }"
          class="nav__link"
          :class="{ 'is-active': activeSubject === s.id }"
        >
          {{ s.name }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-height);
  background: rgba(251 251 253 / 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0 0 0 / 0.08);
}

.nav__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  transition: padding 0.25s var(--ease);
}

/* 学习页：nav 左缘对齐目录(15%)、右缘对齐正文右缘(20%) */
.nav__inner--edge {
  padding-left: var(--learn-pad);
  padding-right: var(--learn-reserve);
}

.nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: -0.01em;
  color: var(--color-text);
}

.nav__logo {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: linear-gradient(135deg, #0071e3, #5e5ce6);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}
.nav__logo::before {
  content: '</>';
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: -0.04em;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav__link {
  padding: 7px 14px;
  border-radius: 980px;
  font-size: 14px;
  color: var(--color-text-3);
  transition:
    color 0.18s var(--ease),
    background-color 0.18s var(--ease);
}
.nav__link:hover {
  color: var(--color-text);
  background: rgba(0 0 0 / 0.05);
}
.nav__link.is-active {
  color: var(--color-text);
  background: rgba(0 0 0 / 0.06);
  font-weight: 500;
}

/* 窄屏：取消边缘对齐的大留白，与学习页移动端 20px 内边距对齐 */
@media (max-width: 960px) {
  .nav__inner--edge {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 640px) {
  .nav__title {
    display: none;
  }
  .nav__link {
    padding: 7px 10px;
    font-size: 13px;
  }
}
</style>
