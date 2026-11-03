<script setup lang="ts">
const cards = [
  {
    k: 'desktop',
    title: '桌面版 · Doit GPUI',
    desc: 'Rust 原生的桌面待办，冷启动飞快，窗口即开即用。支持 macOS / Windows / Linux，发布即独立安装包。',
    chips: ['macOS (Intel & Apple Silicon)', 'Windows', 'Linux'],
    href: 'https://github.com/nabaonan/doit-gpui/releases',
    cta: '去下载',
    icon: 'M3 5h18v11H3zM2 19h20',
  },
  {
    k: 'mobile',
    title: '移动端 · Doit Mobile',
    desc: '为手机而生的待办：随手记、到点提醒、深色跟随系统。数据留在设备，离线也能记。',
    chips: ['iOS', 'Android', 'Expo 构建'],
    href: 'https://github.com/nabaonan/doit-mobile/releases',
    cta: '去下载',
    icon: 'M7 2.5h10a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2ZM11 18.5h2',
  },
]
</script>

<template>
  <section id="download" class="bg-page relative py-20 md:py-28">
    <div class="container-x">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="label">下载</p>
        <h2 class="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
          今天就开始记
        </h2>
        <p class="mt-4 leading-relaxed text-ink-soft">
          开源、免费、无广告，数据都在你自己手里。
        </p>
      </div>

      <div class="mt-12 grid gap-5 md:grid-cols-2">
        <div v-for="c in cards" :key="c.k" class="reveal card flex flex-col p-7">
          <div class="flex items-center gap-4">
            <span class="dl-icon" aria-hidden="true">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <path :d="c.icon" />
              </svg>
            </span>
            <h3 class="text-lg font-bold">{{ c.title }}</h3>
          </div>
          <p class="mt-4 flex-1 leading-relaxed text-ink-soft">{{ c.desc }}</p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span v-for="ch in c.chips" :key="ch" class="chip">{{ ch }}</span>
          </div>
          <div class="mt-7">
            <a
              :href="c.href"
              target="_blank"
              rel="noreferrer"
              class="btn-primary w-full px-5 py-3"
            >
              {{ c.cta }}
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="reveal mt-10 text-center text-sm text-ink-faint">
        想把几个版本都看看？前往
        <a href="https://github.com/nabaonan/doit/releases" target="_blank" rel="noreferrer" class="font-medium text-brand hover:underline">
          全部 Release&nbsp;→
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dl-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--brand-soft);
  color: var(--brand-strong);
  flex: none;
}
</style>
