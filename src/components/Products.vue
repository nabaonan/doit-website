<script setup lang="ts">
import { Smartphone, Monitor, Terminal as TerminalIcon, Cpu } from 'lucide-vue-next'
import { useVersions } from '../composables/useVersions'
import { fadeLoad } from '../directives/fadeLoad'

const vFadeLoad = fadeLoad

// 四端对照：同一份数据，四个入口。展示图用真实运行截图 + CSS 模拟真机边框。
// 桌面端从应用真实渲染截取亮/暗两张，裁掉原生标题栏只留应用内容，再套官网统一的假边框。
// 终端版展示图 = doit-tui 在真实终端里的渲染输出（pyte 精确模拟后导出 PNG）。
// GPUI 原生版展示图 = doit-gpui 纯 Rust 应用的真实运行截图（与桌面端同源视觉）。
const APK_URL = 'https://github.com/nabaonan/doit-apk/releases/latest'
const DESK_URL = 'https://github.com/nabaonan/doit-desktop/releases/latest'
const TUI_URL = 'https://github.com/nabaonan/doit-tui/releases/latest'
const GPUI_URL = 'https://github.com/nabaonan/doit-gpui/releases/latest'

// 图片路径带 base 前缀：兼容 GitHub Pages 的 /doit-website/ 子路径部署
const shot = (name: string) => `${import.meta.env.BASE_URL}shots/${name}.png`

// 示例图跟随站点主题：深色模式展示各端真实的深夜界面截图
defineProps<{ theme: 'light' | 'dark' }>()

const { apkVersion, deskVersion, tuiVersion, gpuiVersion } = useVersions()
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

      <div class="products">
        <!-- 手机端 -->
        <article class="product reveal">
          <span class="product-tag">
            <Smartphone class="ico" :size="15" aria-hidden="true" />
            手机端 · Android
          </span>
          <h3>通勤路上，随手记</h3>
          <p class="one-liner">Kotlin + Jetpack Compose 原生构建，抬手就能记。</p>
          <p class="ver">正式版 <b>{{ apkVersion }}</b> · 开源</p>

          <div class="product-device">
            <div class="phone-frame" aria-label="doit 手机端真机截图">
              <div class="phone-notch"></div>
              <img v-fade-load :src="theme === 'dark' ? shot('home_dark') : shot('home_light')" :alt="theme === 'dark' ? 'doit Android 深夜主题首页：分类标签、今日待办与进度环' : 'doit Android 首页：分类标签、今日待办与进度环'" width="450" height="1000" loading="lazy" decoding="async" />
              <div class="phone-bar"></div>
            </div>
          </div>

          <ul>
            <li>右滑完成，进度跟手生长</li>
            <li>左滑动作：优先级 / 分类 / 子任务 / 删除</li>
            <li>子任务无限下拆，全做完父任务自动整体完成</li>
            <li>月视图归档 · 分类胶囊换色 · 检查更新应用内装 APK</li>
          </ul>

          <a class="btn btn--ghost" :href="APK_URL" target="_blank" rel="noopener">去 GitHub Releases 下载</a>
        </article>

        <!-- 桌面端 -->
        <article class="product reveal">
          <span class="product-tag">
            <Monitor class="ico" :size="15" aria-hidden="true" />
            桌面端 · macOS / Windows / Linux
          </span>
          <h3>坐到电脑前，沉浸敲完</h3>
          <p class="one-liner">Tauri 2 桌面应用，键盘一敲一个准，还能托盘常驻。</p>
          <p class="ver">正式版 <b>{{ deskVersion }}</b></p>

          <div class="product-device">
            <div class="desk-frame" aria-label="doit 桌面端真机截图">
              <div class="desk-bar">
                <span class="dots"><i></i><i></i><i></i></span>
                <span class="desk-title">doit · 今日</span>
                <span class="dots"></span>
              </div>
              <img v-fade-load :src="theme === 'dark' ? shot('desk_today_dark') : shot('desk_today')" :alt="theme === 'dark' ? 'doit 桌面端深夜主题真实运行截图：分类标签、任务列表与子任务' : 'doit 桌面端真实运行截图：分类标签、任务列表与子任务'" width="1400" height="885" loading="lazy" decoding="async" />
            </div>
          </div>

          <ul>
            <li>按住卡片约 0.9 秒走满进度条才完成，松手即回退</li>
            <li>统计：热力图 / 环形占比 / 折线趋势，时间范围联动</li>
            <li>月历面板 &amp; 当日完成清单</li>
            <li>托盘、开机自启、应用内自动更新</li>
          </ul>

          <a class="btn btn--ghost" :href="DESK_URL" target="_blank" rel="noopener">去 GitHub Releases 下载</a>
        </article>

        <!-- 终端版 -->
        <article class="product reveal">
          <span class="product-tag">
            <TerminalIcon class="ico" :size="15" aria-hidden="true" />
            终端版 · macOS / Windows / Linux
          </span>
          <h3>不离开终端，也能打完今天的勾</h3>
          <p class="one-liner">Rust + ratatui，等宽字符界面的全套待办：今日 / 统计 / 月历。</p>
          <p class="ver">正式版 <b>{{ tuiVersion }}</b></p>

          <div class="product-device">
            <div class="term-frame" aria-label="doit 终端版运行截图">
              <div class="term-bar">
                <span class="dots"><i></i><i></i><i></i></span>
                <span class="term-title">doit-tui — zsh</span>
                <span class="dots"></span>
              </div>
              <img v-fade-load :src="theme === 'dark' ? shot('tui_dark') : shot('tui_light')" :alt="theme === 'dark' ? 'doit 终端版深夜主题真实运行截图：今日待办、分类胶囊与进度环' : 'doit 终端版真实运行截图：今日待办、分类胶囊与进度环'" width="1280" height="697" loading="lazy" decoding="async" />
            </div>
          </div>

          <ul>
            <li>纯键盘操作：一个键加任务、空格勾完成、1-4 切页面</li>
            <li>父子卡片、优先级、进度环，和手机 / 桌面端完全同款语义</li>
            <li>统计页热力图 &amp; 月历归档，终端里也能翻</li>
            <li>WebDAV 与其它端双向同步，一份数据到处接</li>
          </ul>

          <a class="btn btn--ghost" :href="TUI_URL" target="_blank" rel="noopener">去 GitHub Releases 下载</a>
        </article>

        <!-- GPUI 原生版 -->
        <article class="product reveal">
          <span class="product-tag">
            <Cpu class="ico" :size="15" aria-hidden="true" />
            原生版 · macOS / Windows / Linux
          </span>
          <h3>纯 Rust 渲染，没有一层 Web</h3>
          <p class="one-liner">GPUI 直接画到窗口上，零 WebView、零 Chromium，启动和交互都利落。</p>
          <p class="ver">正式版 <b>{{ gpuiVersion }}</b></p>

          <div class="product-device">
            <div class="desk-frame" aria-label="doit GPUI 原生版运行截图">
              <div class="desk-bar">
                <span class="dots"><i></i><i></i><i></i></span>
                <span class="desk-title">doit · 原生版</span>
                <span class="dots"></span>
              </div>
              <img v-fade-load :src="theme === 'dark' ? shot('gpui_dark') : shot('gpui_light')" :alt="theme === 'dark' ? 'doit GPUI 原生版深夜主题：纯 Rust 渲染的今日待办' : 'doit GPUI 原生版：纯 Rust 渲染的今日待办'" width="1400" height="840" loading="lazy" decoding="async" />
            </div>
          </div>

          <ul>
            <li>GPUI 直接合成窗口，不套浏览器——无 WebView / 无 Chromium</li>
            <li>与桌面端同源的薄荷绿视觉与今日 / 统计 / 月历四页</li>
            <li>父子卡片、优先级、进度环，语义与其它端完全一致</li>
            <li>WebDAV 与其它端双向同步，一份数据到处接</li>
          </ul>

          <a class="btn btn--ghost" :href="GPUI_URL" target="_blank" rel="noopener">去 GitHub Releases 下载</a>
        </article>
      </div>
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

/* —— 真机边框：手机 —— */
.phone-frame {
  position: relative;
  width: 176px;
  aspect-ratio: 450 / 956;
  margin-inline: auto;
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

/* —— 真机边框：桌面窗口 —— */
.desk-frame {
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  background: var(--card);
  box-shadow: var(--shadow);
}
.desk-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 6px 13px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--line-soft);
}
.desk-bar .dots {
  display: flex;
  gap: 6px;
}
.desk-bar .dots i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ink-3);
  opacity: 0.45;
}
.desk-bar .dots i:nth-child(1) { background: #e06b62; opacity: 0.9; }
.desk-bar .dots i:nth-child(2) { background: #e0b34f; opacity: 0.9; }
.desk-bar .dots i:nth-child(3) { background: #5cbf87; opacity: 0.9; }
.desk-title {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--ink-3);
  letter-spacing: 0.02em;
}
.desk-frame img {
  width: 100%;
  height: auto;
  display: block;
}

/* —— 终端窗口边框 —— */
.term-frame {
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  background: var(--surface-2);
  box-shadow: var(--shadow);
}
.term-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 6px 13px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--line-soft);
}
.term-title {
  font-family: 'Menlo', ui-monospace, 'SF Mono', monospace;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--ink-3);
  letter-spacing: 0.02em;
}
.term-frame img {
  width: 100%;
  height: auto;
  display: block;
  background: var(--paper-deep);
}
</style>
