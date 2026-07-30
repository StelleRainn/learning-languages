<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { subjects } from '@/data/subjects'

const featured = subjects[0]!
const rest = subjects.slice(1)
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="container hero__inner">
        <p class="hero__eyebrow">编程学习笔记</p>
        <h1 class="hero__title">学一门语言，<br />从读懂每一行开始。</h1>
        <p class="hero__subtitle">
          系统整理的交互式笔记，覆盖语法、数据结构、工程实践到底层机制。
          选择一个方向，即刻开始。
        </p>
        <div class="hero__actions">
          <RouterLink class="btn btn--primary" :to="{ name: 'learn', params: { subject: featured.id } }">
            开始学习 {{ featured.name }}
          </RouterLink>
          <a class="btn btn--ghost" href="#tracks">浏览全部方向</a>
        </div>
      </div>
    </section>

    <!-- 学习方向 -->
    <section id="tracks" class="tracks">
      <div class="container">
        <header class="tracks__head">
          <h2>选择你的学习方向</h2>
          <p>每个方向都来自完整、可动手实践的笔记，左侧大纲随时定位章节。</p>
        </header>

        <!-- 特色板块（全宽大色块） -->
        <RouterLink
          class="tile tile--featured"
          :to="{ name: 'learn', params: { subject: featured.id } }"
          :style="{ '--tile-gradient': featured.gradient }"
        >
          <div class="tile__body">
            <span class="tile__glyph">{{ featured.glyph }}</span>
            <h3 class="tile__name">{{ featured.name }}</h3>
            <p class="tile__tagline">{{ featured.tagline }}</p>
            <p class="tile__desc">{{ featured.description }}</p>
            <span class="tile__cta">开始学习 <span class="tile__arrow">›</span></span>
          </div>
          <div class="tile__mark" aria-hidden="true">{{ featured.name }}</div>
        </RouterLink>

        <!-- 次级板块 -->
        <div class="tracks__grid">
          <RouterLink
            v-for="s in rest"
            :key="s.id"
            class="tile"
            :to="{ name: 'learn', params: { subject: s.id } }"
            :style="{ '--tile-gradient': s.gradient }"
          >
            <div class="tile__body">
              <span class="tile__glyph">{{ s.glyph }}</span>
              <h3 class="tile__name">{{ s.name }}</h3>
              <p class="tile__tagline">{{ s.tagline }}</p>
              <p class="tile__desc">{{ s.description }}</p>
              <span class="tile__cta">开始学习 <span class="tile__arrow">›</span></span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 特性 -->
    <section class="features">
      <div class="container features__grid">
        <div class="feature">
          <div class="feature__icon">📚</div>
          <h3>结构化大纲</h3>
          <p>类 IDE 的章节树，随时折叠与跳转，长文档也不迷路。</p>
        </div>
        <div class="feature">
          <div class="feature__icon">⚡</div>
          <h3>舒适的阅读体验</h3>
          <p>宽松排版、清晰层级，代码块独立成区，长时间阅读不疲劳。</p>
        </div>
        <div class="feature">
          <div class="feature__icon">🎯</div>
          <h3>从基础到深入</h3>
          <p>循序渐进，每个阶段都配有动手练习，学完即用。</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <p>Learning · 基于 Vue 构建 · 数据源为本项目的 Notebook。</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Hero ------------------------------------------------------------------ */
.hero {
  padding: 96px 0 64px;
  text-align: center;
  background:
    radial-gradient(1200px 480px at 50% -10%, rgba(0 113 227 / 0.1), transparent 70%),
    var(--color-bg);
}
.hero__eyebrow {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 18px;
}
.hero__title {
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 22px;
}
.hero__subtitle {
  max-width: 640px;
  margin: 0 auto 32px;
  font-size: 19px;
  line-height: 1.55;
  color: var(--color-text-3);
}
.hero__actions {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

/* Tracks ---------------------------------------------------------------- */
.tracks {
  padding: 32px 0 24px;
}
.tracks__head {
  text-align: center;
  margin-bottom: 36px;
}
.tracks__head h2 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 650;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}
.tracks__head p {
  color: var(--color-text-3);
  font-size: 17px;
}

/* Tiles ----------------------------------------------------------------- */
.tile {
  position: relative;
  display: block;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--tile-gradient, #333);
  color: #fff;
  padding: 44px 40px;
  min-height: 280px;
  box-shadow: var(--shadow-md);
  transition:
    transform 0.3s var(--ease),
    box-shadow 0.3s var(--ease);
  isolation: isolate;
}
.tile::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(700px 300px at 80% -20%, rgba(255 255 255 / 0.18), transparent 60%);
  pointer-events: none;
  z-index: -1;
}
.tile:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.tile--featured {
  min-height: 360px;
  margin-bottom: 20px;
}

.tile__body {
  position: relative;
  z-index: 1;
  max-width: 60%;
}
.tile--featured .tile__body {
  max-width: 56%;
}

.tile__glyph {
  font-size: 40px;
  line-height: 1;
  display: block;
  margin-bottom: 18px;
  filter: drop-shadow(0 4px 10px rgba(0 0 0 / 0.2));
}

.tile__name {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1;
  margin-bottom: 12px;
  text-shadow: 0 2px 20px rgba(0 0 0 / 0.18);
}
.tile__tagline {
  font-size: clamp(1.05rem, 2.5vw, 1.3rem);
  font-weight: 500;
  opacity: 0.95;
  margin-bottom: 12px;
}
.tile__desc {
  font-size: 15.5px;
  line-height: 1.55;
  opacity: 0.85;
  margin-bottom: 26px;
  max-width: 420px;
}
.tile__cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 15px;
  font-weight: 500;
  padding: 9px 18px;
  border-radius: 980px;
  background: rgba(255 255 255 / 0.16);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255 255 255 / 0.2);
  transition: background 0.2s var(--ease);
}
.tile:hover .tile__cta {
  background: rgba(255 255 255 / 0.26);
}
.tile__arrow {
  font-size: 18px;
  line-height: 0;
  transform: translateY(-1px);
  transition: transform 0.2s var(--ease);
}
.tile:hover .tile__arrow {
  transform: translate(2px, -1px);
}

/* 巨型水印文字 */
.tile__mark {
  position: absolute;
  right: -10px;
  bottom: -38px;
  font-size: clamp(7rem, 18vw, 13rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.8;
  color: rgba(255 255 255 / 0.12);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.tracks__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.tracks__grid .tile {
  min-height: 260px;
}

/* Features -------------------------------------------------------------- */
.features {
  padding: 80px 0;
}
.features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.feature {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 36px 30px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-soft);
}
.feature__icon {
  font-size: 30px;
  margin-bottom: 16px;
}
.feature h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.feature p {
  color: var(--color-text-3);
  font-size: 15.5px;
  line-height: 1.55;
}

/* Footer ---------------------------------------------------------------- */
.footer {
  border-top: 1px solid var(--color-border-soft);
  padding: 28px 0;
  text-align: center;
  color: var(--color-text-4);
  font-size: 13.5px;
}

/* Responsive ------------------------------------------------------------ */
@media (max-width: 760px) {
  .hero {
    padding: 64px 0 40px;
  }
  .tile__body,
  .tile--featured .tile__body {
    max-width: 100%;
  }
  .tile__mark {
    opacity: 0.5;
  }
  .tracks__grid {
    grid-template-columns: 1fr;
  }
  .features__grid {
    grid-template-columns: 1fr;
  }
}
</style>
