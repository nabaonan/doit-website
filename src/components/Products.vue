<script setup lang="ts">
// 双端对照：同一份数据，两个入口
const APK_URL = 'https://github.com/nabaonan/doit-apk/releases/latest'
const DESK_URL = 'https://github.com/nabaonan/doit-desktop/releases/latest'

const rows = [
  { t: '买早餐回来', done: true },
  { t: '写周报提纲', done: false, k: '紧急', c: '#de5b55' },
  { t: '提交报销单', done: false, k: '普通', c: '#4a86d6' },
  { t: '遛狗子', done: true },
  { t: '订下周五机票', done: false, k: '低', c: '#4fbf9e' },
]
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
            <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="7" y="2.5" width="10" height="19" rx="2.6" />
              <path d="M11 18.5h2" />
            </svg>
            手机端 · Android
          </span>
          <h3>通勤路上，随手记</h3>
          <p class="one-liner">Kotlin + Jetpack Compose 原生构建，抬手就能记。</p>
          <p class="ver">正式版 <b>v1.0.13</b> · 开源</p>

          <div class="product-device">
            <div class="device-phone" aria-hidden="true">
              <p class="device-meta">今日 · 已勾 2 / 5</p>
              <div v-for="(r, i) in rows" :key="i" class="mini-row" :class="{ done: r.done }">
                <span class="c"></span>
                <span class="t" :class="{ done: r.done }">{{ r.t }}</span>
                <span v-if="r.k" class="k" :style="{ background: r.c, color: '#fff' }">{{ r.k }}</span>
              </div>
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
            <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="4.5" width="18" height="12" rx="2.4" />
              <path d="M9 20h6M12 16.5V20" />
            </svg>
            桌面端 · macOS / Windows / Linux
          </span>
          <h3>坐到电脑前，沉浸敲完</h3>
          <p class="one-liner">Tauri 2 桌面应用，键盘一敲一个准，还能托盘常驻。</p>
          <p class="ver">正式版 <b>v0.1.3</b></p>

          <div class="product-device">
            <div class="device-desk" aria-hidden="true">
              <p class="device-meta" style="display: flex; justify-content: space-between">
                <span>今日 · 7 / 9</span>
                <span style="color: var(--accent-ink)">已同步 ✓</span>
              </p>
              <div v-for="(r, i) in rows" :key="i" class="mini-row" :class="{ done: r.done }">
                <span class="c"></span>
                <span class="t" :class="{ done: r.done }">{{ r.t }}</span>
                <span v-if="r.k" class="k" :style="{ background: r.c, color: '#fff' }">{{ r.k }}</span>
              </div>
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
</style>
