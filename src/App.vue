<script setup lang="ts">
import { onMounted } from 'vue'
import SiteNav from './components/SiteNav.vue'
import HeroShowcase from './components/HeroShowcase.vue'
import DesktopPanel from './components/DesktopPanel.vue'
import MobilePanel from './components/MobilePanel.vue'
import FeatureGrid from './components/FeatureGrid.vue'
import DownloadCta from './components/DownloadCta.vue'
import SiteFooter from './components/SiteFooter.vue'

onMounted(() => {
  if (!('IntersectionObserver' in window)) return
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          io.unobserve(e.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
})
</script>

<template>
  <div class="min-h-screen">
    <SiteNav />
    <main>
      <HeroShowcase />
      <DesktopPanel />
      <MobilePanel />
      <FeatureGrid />
      <DownloadCta />
    </main>
    <SiteFooter />
  </div>
</template>
