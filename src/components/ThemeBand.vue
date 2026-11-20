<script setup lang="ts">
// 深夜青灰展示带：整带采用深色调色板，与页面其余浅色形成对照
const emit = defineEmits<{ (e: 'toggle-theme'): void }>()

const skins = [
  { label: '绿色生长', c: 'var(--skin-green)' },
  { label: '火花四溅', c: 'var(--skin-spark)' },
  { label: '蓝色流水', c: 'var(--skin-water)' },
]

const heatDark = Array.from({ length: 42 }, (_, i) => (i * 7) % 11)
const bars = [36, 58, 44, 72, 61, 88, 52, 66, 78, 46, 90, 57]
</script>

<template>
  <section id="theme" class="section section--tight">
    <div class="container">
      <div class="reveal theme-band">
        <div class="theme-grid">
          <div class="reveal">
            <span class="eyebrow">深夜青灰 · 第二套调色板</span>
            <h2>不是把浅色反一下色。是另一套设计。</h2>
            <p>
              青灰纸底 + 亮薄荷强调，深色的图表气泡、滑动进度、状态栏图标也都跟着换。
              完成动画还有三款皮肤可选，进度走满的那一刻，想怎么庆祝都行。
            </p>
            <div class="swatches">
              <span v-for="s in skins" :key="s.label" class="swatch">
                <span class="dot" :style="{ background: s.c }"></span>{{ s.label }}
              </span>
            </div>
            <p class="theme-tip">
              本站也内置了这套双主题，右上角随时切。
              <button type="button" class="btn btn--primary btn--sm" @click="emit('toggle-theme')">
                现在就试试深夜
              </button>
            </p>
          </div>

          <div class="reveal theme-slide" aria-hidden="true">
            <p style="margin: 0 0 0.9rem; color: #a7b8b0; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.05em">
              统计 · 深夜青灰
            </p>
            <div class="mini-heat">
              <i v-for="(l, i) in heatDark" :key="i" :class="{ on: l > 8 }"></i>
            </div>
            <div class="mini-bars">
              <i v-for="(h, i) in bars" :key="i" :style="{ height: h + '%' }" :class="{ peak: h >= 78 }"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
