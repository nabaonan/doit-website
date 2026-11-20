<script setup lang="ts">
// 顶部导航：logo + 锚点 + 「浅色/深夜」分段开关 + 下载
defineProps<{ theme: 'light' | 'dark' }>()
const emit = defineEmits<{ (e: 'toggle-theme'): void }>()

const LINKS = [
  { href: '#products', label: '双端' },
  { href: '#interact', label: '交互' },
  { href: '#stats', label: '统计' },
  { href: '#theme', label: '主题' },
  { href: '#sync', label: '同步' },
]
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
            <a :href="l.href">{{ l.label }}</a>
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
          >
            浅色
          </button>
          <button
            type="button"
            :aria-pressed="theme === 'dark'"
            :tabindex="theme === 'light' ? 0 : -1"
            @click="emit('toggle-theme')"
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
