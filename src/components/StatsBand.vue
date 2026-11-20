<script setup lang="ts">
// 统计带：热力图 / 环形占比 / 折线趋势（忠实呼应 APP 统计页三件套）
const heatCells: { lv: number }[] = Array.from({ length: 49 }, (_, i) => {
  // 伪随机但有规律：周循环 + 完结日更多
  const day = i % 7
  const wave = Math.floor(Math.sin(i / 3.2) * 1000) % 100
  let lv = 0
  if (day === 0 || day === 6) lv = wave > 78 ? 2 : 0
  else lv = day === 5 ? 4 : day >= 3 ? 3 : wave > 40 ? 2 : wave > 18 ? 1 : 0
  return { lv }
})
</script>

<template>
  <section id="stats" class="section">
    <div class="container">
      <div class="reveal section-head">
        <span class="eyebrow">统计</span>
        <h2 class="section-title">完成的日子，都算得清。</h2>
        <p class="section-sub">
          热力图看坚持，环形图看分布，折线看节奏。三个时间段联动，往前翻一年，习惯一目了然。
        </p>
      </div>

      <div class="stats-grid">
        <article class="stat-card reveal">
          <h3 class="stat-name">完成热力图</h3>
          <div class="heat" aria-hidden="true">
            <i v-for="(c, i) in heatCells" :key="i" :style="{ background: `var(--heat-${c.lv})` }"></i>
          </div>
          <p class="stat-foot">近一周 / 近一月 / 近一年 · 绿得越深，做的越多</p>
        </article>

        <article class="stat-card reveal">
          <h3 class="stat-name">按分类占比</h3>
          <div class="donut" aria-hidden="true">
            <b>生活 38%</b>
          </div>
          <p class="stat-foot">图例列全部分类，空白分类也补个 0</p>
        </article>

        <article class="stat-card reveal">
          <h3 class="stat-name">完成趋势</h3>
          <div class="line-chart" aria-hidden="true">
            <svg viewBox="0 0 320 96" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stop-color="var(--accent)" stop-opacity="0.28" />
                  <stop offset="1" stop-color="var(--accent)" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path class="fill" d="M0 84 L40 60 L80 70 L120 40 L160 50 L200 26 L240 42 L280 20 L320 30 L320 96 L0 96 Z" fill="url(#lineFill)" />
              <path class="stroke" d="M0 84 L40 60 L80 70 L120 40 L160 50 L200 26 L240 42 L280 20 L320 30" />
            </svg>
          </div>
          <p class="stat-foot">每日 / 每月完成数，悬停看明细</p>
        </article>
      </div>
    </div>
  </section>
</template>
