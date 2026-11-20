<script setup lang="ts">
// 主题展示带：配色完全跟随全局主题（CSS 变量），
// 切到深夜/浅色时这块统计图表同步变色，本身就是主题切换的活演示。
defineProps<{ theme: 'light' | 'dark' }>()
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
            <span class="eyebrow">当前主题 · {{ theme === 'dark' ? '深夜青灰' : '薄荷青绿' }}</span>
            <h2>切一下，连图表都跟着换色。</h2>
            <p>
              主题不是把浅色反一下色。热力图的绿阶、滑动进度、状态栏图标都跟着换，
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
                现在就试试{{ theme === 'dark' ? '浅色' : '深夜' }}
              </button>
            </p>
          </div>

          <div class="reveal theme-slide" aria-hidden="true">
            <p class="theme-slide-label">统计 · {{ theme === 'dark' ? '深夜青灰' : '薄荷青绿' }}</p>
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
