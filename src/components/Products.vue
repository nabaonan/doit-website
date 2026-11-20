<script setup lang="ts">
import { Smartphone, Monitor } from 'lucide-vue-next'

// 双端对照：同一份数据，两个入口。展示图用真实运行截图 + CSS 模拟真机边框。
const APK_URL = 'https://github.com/nabaonan/doit-apk/releases/latest'
const DESK_URL = 'https://github.com/nabaonan/doit-desktop/releases/latest'
</script>

<template>
  <section id="products" class="section">
    <div class="container">
      <div class="reveal section-head">
        <span class="eyebrow">两个入口 · 一份数据</span>
        <h2 class="section-title">在手机上随手记，<br class="hide-mobile" />在电脑上沉浸敲完。</h2>
        <p class="section-sub">
          同一款应用的两种形态。手机端与桌面端经 WebDAV 双向同步，共用同一个
          <code>doit-backup.json</code>，手机记的，桌面继续。
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
          <p class="ver">正式版 <b>v1.0.13</b> · 开源</p>

          <div class="product-device">
            <div class="phone-frame" aria-label="doit 手机端真机截图">
              <div class="phone-notch"></div>
              <img src="/shots/home_light.png" alt="doit Android 首页：分类标签、今日待办与进度环" width="450" height="1000" loading="lazy" decoding="async" />
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
          <p class="ver">正式版 <b>v0.1.3</b></p>

          <div class="product-device">
            <div class="desk-frame" aria-label="doit 桌面端真机截图">
              <div class="desk-bar">
                <span class="dots"><i></i><i></i><i></i></span>
                <span class="desk-title">doit · 今日</span>
                <span class="dots"></span>
              </div>
              <img src="/shots/desk_today.png" alt="doit 桌面端今日待办：分类标签、任务列表与子任务" width="1400" height="897" loading="lazy" decoding="async" />
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
  padding: 10px 13px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--line-soft);
}
.desk-bar .dots {
  display: flex;
  gap: 6px;
}
.desk-bar .dots i {
  width: 9px;
  height: 9px;
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
</style>
