<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { prefetchThemeShots } from '../composables/useThemeShots'

// 顶部导航：logo + 锚点 + 「浅色/深夜」分段开关 + 下载
defineProps<{ theme: 'light' | 'dark' }>()
const emit = defineEmits<{ (e: 'toggle-theme'): void }>()

// 悬停主题按钮时预载目标主题截图：鼠标挪过去 = 很可能要切，提前拉图避免切换闪现
function onHoverTarget(target: 'light' | 'dark') {
  prefetchThemeShots(target)
}

const LINKS = [
  { href: '#products', label: '四端' },
  { href: '#features', label: '功能' },
  { href: '#interact', label: '交互' },
  { href: '#stats', label: '统计' },
  { href: '#theme', label: '主题' },
  { href: '#sync', label: '同步' },
]

// —— 滚动联动：当前视口所在的区块对应导航高亮 ——
const activeHref = ref<string>('')
let raf = 0

function updateActive() {
  // 激活线设在视口上方 32% 处，跟随滚动找到最后一个越过该线的区块
  const line = window.innerHeight * 0.32
  let current = ''
  for (const l of LINKS) {
    const el = document.querySelector(l.href) as HTMLElement | null
    if (el && el.getBoundingClientRect().top <= line) current = l.href
  }
  // 滚到页面底部时强制点亮最后一项（避免末段区块太矮越不过激活线）
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
    current = LINKS[LINKS.length - 1].href
  }
  activeHref.value = current
}

function onScroll() {
  if (raf) return
  raf = requestAnimationFrame(() => {
    updateActive()
    raf = 0
  })
}

onMounted(() => {
  updateActive()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <header class="site-nav">
    <div class="container nav-inner">
      <a class="brand" href="#top" aria-label="doit 回到顶部">
        <span class="mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6.5 12.5l3.6 3.6 7.4-8.2" />
          </svg>
        </span>
        <b>doit</b>
      </a>

      <nav aria-label="页内导航">
        <ul class="nav-links">
          <li v-for="l in LINKS" :key="l.href">
            <a
              :href="l.href"
              :class="{ active: activeHref === l.href }"
              :aria-current="activeHref === l.href ? 'location' : undefined"
            >{{ l.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="nav-actions">
        <div class="theme-pill" role="group" aria-label="切换主题">
          <button
            type="button"
            :aria-pressed="theme === 'light'"
            :tabindex="theme === 'dark' ? 0 : -1"
            @click="emit('toggle-theme')"
            @mouseenter="onHoverTarget('light')"
          >
            浅色
          </button>
          <button
            type="button"
            :aria-pressed="theme === 'dark'"
            :tabindex="theme === 'light' ? 0 : -1"
            @click="emit('toggle-theme')"
            @mouseenter="onHoverTarget('dark')"
          >
            深夜
          </button>
        </div>
        <span class="nav-cta">
          <a
            class="btn btn--primary btn--sm"
            href="https://github.com/nabaonan/doit-apk/releases/latest"
            target="_blank"
            rel="noopener"
          >
            <span class="long">下载</span> Android
          </a>
        </span>
      </div>
    </div>
  </header>
</template>
