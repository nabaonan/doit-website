<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SiteNav from './components/SiteNav.vue'
import Hero from './components/Hero.vue'
import Products from './components/Products.vue'
import CoreFeatures from './components/CoreFeatures.vue'
import InteractionDemo from './components/InteractionDemo.vue'
import StatsBand from './components/StatsBand.vue'
import ThemeBand from './components/ThemeBand.vue'
import SyncBand from './components/SyncBand.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useReveal } from './composables/useReveal'
import { idlePrefetch, prefetchThemeShots } from './composables/useThemeShots'

const theme = ref<'light' | 'dark'>(
  (document.documentElement.dataset.theme as 'light' | 'dark') || 'light',
)

function setTheme(m: 'light' | 'dark') {
  // 切换前预加载目标主题的截图，避免 <img> 换 src 时等待网络
  prefetchThemeShots(m)
  theme.value = m
  document.documentElement.dataset.theme = m
  try {
    localStorage.setItem('doit-site-theme', m)
  } catch {
    /* 忽略 */
  }
}

function toggleTheme() {
  setTheme(theme.value === 'light' ? 'dark' : 'light')
}

onMounted(() => {
  // 空闲时预载「另一套」截图，用户第一次切主题就已缓存，几乎零等待
  idlePrefetch(theme.value === 'light' ? 'dark' : 'light')
})

useReveal(() => document.getElementById('app'))
</script>

<template>
  <SiteNav :theme="theme" @toggle-theme="toggleTheme" />
  <main>
    <Hero />
    <Products :theme="theme" />
    <CoreFeatures :theme="theme" />
    <InteractionDemo />
    <StatsBand />
    <ThemeBand :theme="theme" @toggle-theme="toggleTheme" />
    <SyncBand />
  </main>
  <SiteFooter />
</template>

<style>
/* 顶部锚点滚动留白：sticky 导航下方内容不被盖住 */
[id] {
  scroll-margin-top: 72px;
}
</style>
