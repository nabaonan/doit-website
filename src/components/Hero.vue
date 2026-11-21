<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowRight, Monitor } from 'lucide-vue-next'
import { useVersions } from '../composables/useVersions'

const drawn = ref(false)
const { apkVersion, deskVersion } = useVersions()

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
            <ArrowRight class="btn-ico" :size="18" aria-hidden="true" />
            下载 Android
          </a>
          <a
            class="btn btn--ghost"
            href="https://github.com/nabaonan/doit-desktop/releases/latest"
            target="_blank"
            rel="noopener"
          >
            <Monitor class="btn-ico" :size="18" aria-hidden="true" />
            下载桌面版
          </a>
        </div>

        <p class="hero-meta">
          <span>Android {{ apkVersion }}</span>
          <span class="dot" aria-hidden="true"></span>
          <span>桌面端 {{ deskVersion }} · macOS / Windows / Linux</span>
          <span class="dot" aria-hidden="true"></span>
          <span>开源在 GitHub</span>
        </p>
      </div>
    </div>
  </section>
</template>
