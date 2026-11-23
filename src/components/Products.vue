<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Component } from 'vue'
import {
  Smartphone,
  Monitor,
  Terminal as TerminalIcon,
  Cpu,
} from 'lucide-vue-next'
import { useVersions } from '../composables/useVersions'
import { fadeLoad } from '../directives/fadeLoad'

const vFadeLoad = fadeLoad

// 四端展示：同一份数据，四个入口。展示图用真实运行截图 + CSS 模拟真机边框。
// 桌面端 / GPUI 原生版用窗口式假边框；终端版用终端假边框；手机端用真机边框。
const APK_URL = 'https://github.com/nabaonan/doit-apk/releases/latest'
const DESK_URL = 'https://github.com/nabaonan/doit-desktop/releases/latest'
const TUI_URL = 'https://github.com/nabaonan/doit-tui/releases/latest'
const GPUI_URL = 'https://github.com/nabaonan/doit-gpui/releases/latest'

// 图片路径带 base 前缀：兼容 GitHub Pages 的 /doit-website/ 子路径部署
const shot = (name: string) => `${import.meta.env.BASE_URL}shots/${name}.png`

const props = defineProps<{ theme: 'light' | 'dark' }>()

const { apkVersion, deskVersion, tuiVersion, gpuiVersion } = useVersions()

type TabKind = 'phone' | 'desk' | 'term' | 'gpui'

interface Tab {
  kind: TabKind
  label: string
  meta: string
  tagline: string
  oneLiner: string
  icon: Component
  light: string
  dark: string
  frame: 'phone' | 'window' | 'term'
  frameTitle: string
  bullets: string[]
  url: string
  version: string
}

const tabs: Tab[] = [
  {
    kind: 'phone',
    label: '手机端',
    meta: 'Android',
    tagline: '通勤路上，随手记',
    oneLiner: 'Kotlin + Jetpack Compose 原生构建，抬手就能记。',
    icon: Smartphone,
    light: shot('home_light'),
    dark: shot('home_dark'),
    frame: 'phone',
    frameTitle: 'doit · 今日',
    bullets: [
      '右滑完成，进度跟手生长',
      '左滑动作：优先级 / 分类 / 子任务 / 删除',
      '子任务无限下拆，全做完父任务自动整体完成',
      '月视图归档 · 分类胶囊换色 · 检查更新应用内装 APK',
    ],
    url: APK_URL,
    version: apkVersion.value,
  },
  {
    kind: 'desk',
    label: '桌面端',
    meta: 'macOS / Windows / Linux',
    tagline: '坐到电脑前，沉浸敲完',
    oneLiner: 'Tauri 2 桌面应用，键盘一敲一个准，还能托盘常驻。',
    icon: Monitor,
    light: shot('desk_today'),
    dark: shot('desk_today_dark'),
    frame: 'window',
    frameTitle: 'doit · 今日',
    bullets: [
      '按住卡片约 0.9 秒走满进度条才完成，松手即回退',
      '统计：热力图 / 环形占比 / 折线趋势，时间范围联动',
      '月历面板 &amp; 当日完成清单',
      '托盘、开机自启、应用内自动更新',
    ],
    url: DESK_URL,
    version: deskVersion.value,
  },
  {
    kind: 'term',
    label: '终端版',
    meta: 'macOS / Windows / Linux',
    tagline: '不离开终端，也能打完今天的勾',
    oneLiner: 'Rust + ratatui，等宽字符界面的全套待办：今日 / 统计 / 月历。',
    icon: TerminalIcon,
    light: shot('tui_light'),
    dark: shot('tui_dark'),
    frame: 'term',
    frameTitle: 'doit-tui — zsh',
    bullets: [
      '纯键盘操作：一个键加任务、空格勾完成、1-4 切页面',
      '父子卡片、优先级、进度环，和手机 / 桌面端完全同款语义',
      '统计页热力图 &amp; 月历归档，终端里也能翻',
      'WebDAV 与其它端双向同步，一份数据到处接',
    ],
    url: TUI_URL,
    version: tuiVersion.value,
  },
  {
    kind: 'gpui',
    label: '原生版',
    meta: 'macOS / Windows / Linux',
    tagline: '纯 Rust 渲染，没有一层 Web',
    oneLiner: 'GPUI 直接画到窗口上，零 WebView、零 Chromium，启动和交互都利落。',
    icon: Cpu,
    light: shot('gpui_light'),
    dark: shot('gpui_dark'),
    frame: 'window',
    frameTitle: 'doit · 原生版',
    bullets: [
      'GPUI 直接合成窗口，不套浏览器——无 WebView / 无 Chromium',
      '与桌面端同源的薄荷绿视觉与今日 / 统计 / 月历四页',
      '父子卡片、优先级、进度环，语义与其它端完全一致',
      'WebDAV 与其它端双向同步，一份数据到处接',
    ],
    url: GPUI_URL,
    version: gpuiVersion.value,
  },
]

// —— 当前选中 tab ——
const active = ref(0)
const current = computed(() => tabs[active.value])
const isDark = computed(() => props.theme === 'dark')

// —— 定时自动轮换：每 5 秒切到下一个，循环；悬停暂停，点击重置 ——
const ROTATE_MS = 5000
let timer: number | null = null
const paused = ref(false)

function next() {
  active.value = (active.value + 1) % tabs.length
}

function startRotate() {
  stopRotate()
  if (paused.value) return
  timer = window.setInterval(next, ROTATE_MS)
}

function stopRotate() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

function onHover(inArea: boolean) {
  paused.value = inArea
  if (inArea) stopRotate()
  else startRotate()
}

function select(i: number) {
  active.value = i
  // 手动切换后重设计时，从新 tab 开始算
  startRotate()
}

// 尊重 prefers-reduced-motion：不自动轮换
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

onMounted(() => {
  if (prefersReducedMotion()) {
    paused.value = true
    return
  }
  startRotate()
})

onBeforeUnmount(stopRotate)
</script>

<template>
  <section id="products" class="section">
    <div class="container">
      <div class="reveal section-head">
        <span class="eyebrow">四个入口 · 一份数据</span>
        <h2 class="section-title">在手机上随手记，<br class="hide-mobile" />在桌面、终端和原生版里接着干。</h2>
        <p class="section-sub">
          同一份数据的四种形态。手机、桌面、终端与 GPUI 原生版经 WebDAV 双向同步，共用同一个
          <code>doit-backup.json</code>，手机记的，其它端继续。
        </p>
      </div>

      <!-- 上方：当前端展示区 -->
      <div class="tab-stage reveal" @mouseenter="onHover(true)" @mouseleave="onHover(false)">
        <Transition name="tab-swap" mode="out-in">
          <div :key="current.kind" class="tab-panel">
            <div class="panel-head">
              <div class="panel-copy">
                <span class="product-tag">
                  <component :is="current.icon" class="ico" :size="15" aria-hidden="true" />
                  {{ current.label }} · {{ current.meta }}
                </span>
                <h3>{{ current.tagline }}</h3>
                <p class="one-liner">{{ current.oneLiner }}</p>
                <p class="ver">正式版 <b>{{ current.version }}</b></p>
                <ul>
                  <li v-for="(b, i) in current.bullets" :key="i">{{ b }}</li>
                </ul>
                <a class="btn btn--ghost" :href="current.url" target="_blank" rel="noopener">
                  去 GitHub Releases 下载
                </a>
              </div>

              <div class="panel-visual">
                <!-- 手机真机边框 -->
                <div v-if="current.frame === 'phone'" class="phone-frame" :aria-label="current.label + '真机截图'">
                  <div class="phone-notch"></div>
                  <img v-fade-load :src="isDark ? current.dark : current.light" :alt="current.label + '运行截图'" width="450" height="1000" loading="lazy" decoding="async" />
                  <div class="phone-bar"></div>
                </div>

                <!-- 窗口式边框（桌面 / 原生） -->
                <div v-else-if="current.frame === 'window'" class="desk-frame" :aria-label="current.label + '运行截图'">
                  <div class="desk-bar">
                    <span class="dots"><i></i><i></i><i></i></span>
                    <span class="desk-title">{{ current.frameTitle }}</span>
                    <span class="dots"></span>
                  </div>
                  <img v-fade-load :src="isDark ? current.dark : current.light" :alt="current.label + '运行截图'" width="1400" height="885" loading="lazy" decoding="async" />
                </div>

                <!-- 终端边框 -->
                <div v-else class="term-frame" :aria-label="current.label + '运行截图'">
                  <div class="term-bar">
                    <span class="dots"><i></i><i></i><i></i></span>
                    <span class="term-title">{{ current.frameTitle }}</span>
                    <span class="dots"></span>
                  </div>
                  <img v-fade-load :src="isDark ? current.dark : current.light" :alt="current.label + '运行截图'" width="1280" height="697" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 下方：胶囊 tab -->
      <nav class="tab-pills reveal" aria-label="选择端" @mouseenter="onHover(true)" @mouseleave="onHover(false)">
        <button
          v-for="(t, i) in tabs"
          :key="t.kind"
          type="button"
          class="pill"
          :class="{ active: i === active }"
          :aria-pressed="i === active"
          @click="select(i)"
        >
          <component :is="t.icon" :size="15" aria-hidden="true" />
          <span>{{ t.label }}</span>
        </button>
      </nav>
    </div>
  </section>
</template>

<style scoped>
code {
  font-family: 'Outfit', ui-monospace, monospace;
  font-size: 0.9em;
  color: var(--accent-ink);
  background: var(--accent-soft);
  padding: 0.05em 0.35em;
  border-radius: 6px;
}
.hide-mobile {
  display: none;
}
@media (min-width: 560px) {
  .hide-mobile {
    display: initial;
  }
}

/* —— 展示台 —— */
.tab-stage {
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
}
.tab-panel {
  background: var(--card);
  border: 1px solid var(--line-soft);
  border-radius: 24px;
  padding: clamp(1.6rem, 3.4vw, 2.6rem);
  box-shadow: var(--shadow);
}
.panel-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: clamp(1.5rem, 3vw, 3rem);
  align-items: center;
}
.panel-copy h3 {
  margin: 0.6rem 0 0.35rem;
}
.panel-copy .one-liner {
  color: var(--ink-3);
  font-size: 0.95rem;
  line-height: 1.6;
}
.panel-copy .ver {
  margin: 0.6rem 0 0.9rem;
  color: var(--ink-2);
  font-size: 0.85rem;
}
.panel-copy ul {
  list-style: none;
  margin: 0 0 1.4rem;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}
.panel-copy ul li {
  position: relative;
  padding-left: 1.1rem;
  color: var(--ink-2);
  font-size: 0.92rem;
  line-height: 1.5;
}
.panel-copy ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.42em;
  height: 0.42em;
  border-radius: 50%;
  background: var(--accent);
}
.panel-visual {
  display: grid;
  place-items: center;
}

/* —— 切换动画 —— */
.tab-swap-enter-active,
.tab-swap-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.tab-swap-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.tab-swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
@media (prefers-reduced-motion: reduce) {
  .tab-swap-enter-active,
  .tab-swap-leave-active {
    transition: none;
  }
}

/* —— 胶囊 tab —— */
.tab-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  justify-content: center;
  margin-top: clamp(1.1rem, 2.5vw, 1.6rem);
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1.1rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--ink-2);
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.pill:hover {
  border-color: var(--accent);
  color: var(--accent-ink);
  transform: translateY(-1px);
}
.pill.active {
  background: var(--accent);
  color: var(--on-accent);
  border-color: var(--accent);
}
.pill:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* —— 真机边框：手机 —— */
.phone-frame {
  position: relative;
  width: 168px;
  aspect-ratio: 450 / 956;
  border: 6px solid var(--paper-deep);
  border-radius: 32px;
  background: var(--card);
  box-shadow: var(--shadow), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  overflow: hidden;
}
.phone-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}
.phone-notch {
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  width: 52px;
  height: 13px;
  border-radius: 999px;
  background: var(--paper-deep);
  z-index: 2;
}
.phone-bar {
  position: absolute;
  bottom: 7px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  border-radius: 999px;
  background: var(--ink-3);
  opacity: 0.55;
  z-index: 2;
}

/* —— 窗口式边框 —— */
.desk-frame {
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  background: var(--card);
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 560px;
}
.desk-frame img {
  width: 100%;
  height: auto;
  display: block;
}

/* —— 终端边框 —— */
.term-frame {
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  background: var(--surface-2);
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 560px;
}
.term-frame img {
  width: 100%;
  height: auto;
  display: block;
  background: var(--paper-deep);
}

/* —— 统一窗口标题栏 —— */
.desk-bar,
.term-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 6px 13px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--line-soft);
}
.desk-bar .dots,
.term-bar .dots {
  display: flex;
  gap: 6px;
}
.desk-bar .dots i,
.term-bar .dots i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ink-3);
  opacity: 0.45;
}
.desk-bar .dots i:nth-child(1), .term-bar .dots i:nth-child(1) { background: #e06b62; opacity: 0.9; }
.desk-bar .dots i:nth-child(2), .term-bar .dots i:nth-child(2) { background: #e0b34f; opacity: 0.9; }
.desk-bar .dots i:nth-child(3), .term-bar .dots i:nth-child(3) { background: #5cbf87; opacity: 0.9; }
.desk-title,
.term-title {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--ink-3);
  letter-spacing: 0.02em;
}
.term-title {
  font-family: 'Menlo', ui-monospace, 'SF Mono', monospace;
  font-size: 0.68rem;
}

/* —— 响应式 —— */
@media (max-width: 900px) {
  .panel-head {
    grid-template-columns: 1fr;
  }
  .panel-visual {
    order: -1;
  }
}
</style>
