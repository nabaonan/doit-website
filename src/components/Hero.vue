<script setup lang="ts">
import { onMounted, ref } from 'vue'

const drawn = ref(false)

onMounted(() => {
  // 一次编排好的入场：等首帧稳定后再驱动描边生长
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      drawn.value = true
    })
  })
})
</script>

<template>
  <section id="top" class="hero" aria-label="介绍">
    <svg
      class="hero-mark"
      :class="{ draw: drawn }"
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle class="ring" cx="100" cy="100" r="94" />
      <circle
        cx="100"
        cy="100"
        r="74"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-dasharray="2 12"
        stroke-linecap="round"
        opacity="0.45"
      />
      <path class="check" d="M64 102 l27 27 l50 -56" fill="none" />
    </svg>

    <div class="container">
      <div class="hero-inner stagger" :class="{ run: drawn }">
        <span class="eyebrow">一款薄荷绿的待办应用</span>

        <h1>
          今天的事，<br />
          <span class="accent">今天打完勾。</span>
        </h1>

        <p class="hero-lead">
          重要的事，收进一个个小圈里。点一下、滑一下、勾起来——手机和电脑共用同一份数据，走到哪，记到哪。
        </p>

        <div class="hero-cta">
          <a
            class="btn btn--primary"
            href="https://github.com/nabaonan/doit-apk/releases/latest"
            target="_blank"
            rel="noopener"
          >
            <svg class="btn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            下载 Android
          </a>
          <a
            class="btn btn--ghost"
            href="https://github.com/nabaonan/doit-desktop/releases/latest"
            target="_blank"
            rel="noopener"
          >
            <svg class="btn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="4.5" width="18" height="12" rx="2.4" />
              <path d="M9 20h6M12 16.5V20" />
            </svg>
            下载桌面版
          </a>
        </div>

        <p class="hero-meta">
          <span>Android v1.0.13</span>
          <span class="dot" aria-hidden="true"></span>
          <span>桌面端 v0.1.3 · macOS / Windows / Linux</span>
          <span class="dot" aria-hidden="true"></span>
          <span>开源在 GitHub</span>
        </p>
      </div>
    </div>
  </section>
</template>
