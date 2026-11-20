<script setup lang="ts">
import { ref } from 'vue'
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

const theme = ref<'light' | 'dark'>(
  (document.documentElement.dataset.theme as 'light' | 'dark') || 'light',
)

function setTheme(m: 'light' | 'dark') {
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

useReveal(() => document.getElementById('app'))
</script>

<template>
  <SiteNav :theme="theme" @toggle-theme="toggleTheme" />
  <main>
    <Hero />
    <Products />
    <CoreFeatures />
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
