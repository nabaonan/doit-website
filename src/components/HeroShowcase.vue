<script setup lang="ts">
import desktopImg from '../assets/desktop-gpui.webp'
import mobileImg from '../assets/mobile-real.jpg'

const platforms = ['macOS', 'Windows', 'Linux', 'iOS', 'Android']
</script>

<template>
  <section id="top" class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="hero-blob hero-blob-a" />
      <div class="hero-blob hero-blob-b" />
      <div class="hero-grid" />
    </div>

    <div class="container-x relative pb-16 pt-28 md:pb-24 md:pt-36">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="font-display text-4xl leading-[1.12] font-bold tracking-tight md:text-6xl">
          一套待办，<br class="sm:hidden" />两种打开方式。
        </h1>
        <p
          class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft [text-wrap:pretty] md:text-lg"
        >
          Doit 是本地优先的极简待办应用：桌面端
          <b class="whitespace-nowrap font-semibold text-ink">Doit GPUI</b>
          用纯 Rust 写成，移动端
          <b class="whitespace-nowrap font-semibold text-ink">Doit Mobile</b>
          由 React Native 构建。数据存在你自己的设备上——无账号、可离线，跨端一套顺手。
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-3 max-sm:flex-col">
          <a href="#download" class="btn-primary px-6 py-3 text-base max-sm:w-full">下载桌面版</a>
          <a href="https://github.com/nabaonan/doit-mobile/releases" target="_blank" rel="noreferrer" class="btn-secondary px-6 py-3 text-base max-sm:w-full">下载移动端</a>
          <a href="#desktop" class="btn px-4 py-3 text-base text-ink-soft hover:text-ink">
            了解详情&nbsp;→
          </a>
        </div>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
          <span v-for="p in platforms" :key="p" class="chip">{{ p }}</span>
        </div>
      </div>

      <div class="hero-stage mt-14 md:mt-20">
        <figure class="hero-in device desktop-device" style="animation-delay: 0.26s">
          <div class="overflow-hidden rounded-2xl border border-line bg-card shadow-2xl">
            <img
              :src="desktopImg"
              alt="Doit GPUI 桌面端：今日待办视图"
              width="973"
              height="781"
              class="block w-full"
              loading="eager"
            />
          </div>
          <figcaption class="device-caption">
            <span class="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true"></span>
            桌面版 · Doit GPUI
          </figcaption>
        </figure>
        <figure class="hero-in device phone-device" style="animation-delay: 0.34s">
          <div class="phone-bezel">
            <img
              :src="mobileImg"
              alt="Doit Mobile 移动端：今日待办视图"
              width="1152"
              height="2520"
              class="block h-full w-full rounded-[28px] object-cover"
              loading="eager"
            />
          </div>
          <figcaption class="device-caption">
            <span class="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true"></span>
            移动端 · Doit Mobile
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(72px);
  opacity: 0.55;
}
.hero-blob-a {
  width: 520px;
  height: 520px;
  left: -140px;
  top: -160px;
  background: radial-gradient(circle at 30% 30%, rgba(47, 163, 97, 0.24), transparent 65%);
}
.hero-blob-b {
  width: 700px;
  height: 700px;
  right: -180px;
  bottom: -260px;
  background: radial-gradient(circle at 60% 40%, rgba(47, 163, 97, 0.16), transparent 65%);
}
html.dark .hero-blob-a {
  background: radial-gradient(circle at 30% 30%, rgba(78, 216, 156, 0.15), transparent 65%);
}
html.dark .hero-blob-b {
  background: radial-gradient(circle at 60% 40%, rgba(78, 216, 156, 0.1), transparent 65%);
}
.hero-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--line) 1px, transparent 1px);
  background-size: 26px 26px;
  opacity: 0.55;
  mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, black 0%, transparent 72%);
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, black 0%, transparent 72%);
}

.hero-in {
  opacity: 0;
  transform: translateY(20px);
  animation: hero-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
@keyframes hero-in {
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-in {
    opacity: 1;
    transform: none;
    animation: none;
  }
}

.hero-stage {
  position: relative;
  max-width: 880px;
  margin: 0 auto;
}
.desktop-device {
  width: min(660px, 94%);
  margin-left: auto;
}
.phone-device {
  position: absolute;
  left: 0;
  bottom: 34px;
  width: 252px;
  z-index: 2;
}
.phone-bezel {
  overflow: hidden;
  border-radius: 38px;
  border: 6px solid #11151a;
  box-shadow:
    var(--shadow),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}
.device-caption {
  margin-top: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-soft);
  background: var(--card);
  border: 1px solid var(--line);
  padding: 6px 14px;
  border-radius: 999px;
  box-shadow: 0 8px 20px -10px rgba(0, 0, 0, 0.18);
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.device:hover .device-caption {
  transform: translateY(-2px);
  border-color: var(--brand);
}
.device {
  margin: 0;
  transition: transform 0.3s ease, filter 0.3s ease;
}
.device:hover {
  transform: translateY(-6px);
}

/* 深色主题：把浅色产品截图反相成暗色效果，与主题保持一致 */
html.dark .device img {
  filter: invert(0.92) hue-rotate(180deg) saturate(0.95);
}

@media (max-width: 767px) {
  .hero-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  .desktop-device {
    width: 100%;
    margin-left: 0;
  }
  .phone-device {
    position: static;
    width: 240px;
  }
  .device-caption {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
