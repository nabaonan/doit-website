<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { isDark, toggle } = useTheme()

const links = [
  { href: '#desktop', label: '桌面版' },
  { href: '#mobile', label: '移动端' },
  { href: '#features', label: '功能' },
  { href: '#download', label: '下载' },
]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur-md">
    <div class="container-x flex h-16 items-center justify-between gap-3">
      <a href="#top" class="flex items-center gap-2.5" aria-label="Doit 首页">
        <svg viewBox="0 0 64 64" width="26" height="26" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="21" stroke="currentColor" stroke-width="6" class="text-brand" />
          <path
            d="M22 33.5 29.5 41 44 25.5"
            stroke="currentColor"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-brand"
          />
        </svg>
        <span class="font-display text-lg font-bold tracking-tight">Doit</span>
      </a>

      <nav class="flex items-center gap-0.5 md:gap-1.5" aria-label="站点导航">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="rounded-full px-2.5 py-1.5 text-sm text-ink-soft transition hover:bg-brand-soft/70 hover:text-ink md:px-3"
        >
          {{ l.label }}
        </a>
        <a
          href="https://github.com/nabaonan/doit"
          target="_blank"
          rel="noreferrer"
          class="ml-1 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm text-ink-soft transition hover:bg-brand-soft/70 hover:text-ink"
          aria-label="GitHub"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
            />
          </svg>
          <span class="hidden sm:inline">GitHub</span>
        </a>
        <button
          type="button"
          class="ml-0.5 flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-brand-soft/70 hover:text-ink"
          :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
          :title="isDark ? '浅色模式' : '深色模式'"
          @click="toggle"
        >
          <svg
            v-if="isDark"
            class="h-[18px] w-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
          </svg>
          <svg
            v-else
            class="h-[18px] w-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        </button>
      </nav>
    </div>
  </header>
</template>
