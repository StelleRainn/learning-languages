<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import AppNav from '@/components/AppNav.vue'

const route = useRoute()
const activeSubject = computed(() =>
  route.name === 'learn' ? (route.params.subject as string | undefined) : undefined,
)
</script>

<template>
  <AppNav :active-subject="activeSubject" />
  <main>
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--nav-height));
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s var(--ease);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
