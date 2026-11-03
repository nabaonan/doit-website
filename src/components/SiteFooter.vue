<script setup lang="ts">
const year = new Date().getFullYear()
const projects = [
  { t: 'Doit GPUI', href: 'https://github.com/nabaonan/doit-gpui' },
  { t: 'Doit Mobile', href: 'https://github.com/nabaonan/doit-mobile' },
  { t: 'Doit（Tauri 版）', href: 'https://github.com/nabaonan/doit' },
]
</script>

<template>
  <footer class="border-t border-line">
    <div class="container-x py-12">
      <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div class="max-w-xs">
          <a href="#top" class="flex items-center gap-2.5">
            <svg viewBox="0 0 64 64" width="26" height="26" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="21" stroke="currentColor" stroke-width="6" class="text-brand" />
              <path d="M22 33.5 29.5 41 44 25.5" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" class="text-brand" />
            </svg>
            <span class="font-display text-lg font-bold tracking-tight">Doit</span>
          </a>
          <p class="mt-3 text-sm leading-relaxed text-ink-faint">
            数据在你自己的设备上。本地优先，开源免费。
          </p>
        </div>

        <div>
          <div class="text-sm font-semibold text-ink-soft">项目</div>
          <ul class="mt-3 space-y-2 text-sm">
            <li v-for="p in projects" :key="p.href">
              <a :href="p.href" target="_blank" rel="noreferrer" class="text-ink-soft transition hover:text-brand">
                {{ p.t }}&nbsp;↗
              </a>
            </li>
          </ul>
        </div>

        <a href="#top" class="text-sm text-ink-soft transition hover:text-brand">回到顶部&nbsp;↑</a>
      </div>

      <div class="mt-10 border-t border-line pt-6 text-[13px] text-ink-faint">
        © {{ year }} nabaonan · 开源（MIT）· 用 Rust、Vue 与 React Native 构建
      </div>
    </div>
  </footer>
</template>
