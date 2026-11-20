<script setup lang="ts">
// 主题展示带：左侧文案 + 右侧真机截图对照。
// 主主题切到深夜时展示深夜真机图，切回浅色展示浅色真机图，
// 这块本身就是主题切换的活演示。
defineProps<{ theme: 'light' | 'dark' }>()
const emit = defineEmits<{ (e: 'toggle-theme'): void }>()

const skins = [
  { label: '绿色生长', c: 'var(--skin-green)' },
  { label: '火花四溅', c: 'var(--skin-spark)' },
  { label: '蓝色流水', c: 'var(--skin-water)' },
]
</script>

<template>
  <section id="theme" class="section section--tight">
    <div class="container">
      <div class="reveal theme-band">
        <div class="theme-grid">
          <div class="reveal">
            <span class="eyebrow">当前主题 · {{ theme === 'dark' ? '深夜青灰' : '薄荷青绿' }}</span>
            <h2>切一下，整个界面都换色。</h2>
            <p>
              主题不是把浅色反一下色。热力图的绿阶、状态栏图标、卡片底色都按当前主题重新取色，
              完成动画还有三款皮肤可选，进度走满的那一刻，想怎么庆祝都行。
            </p>
            <div class="swatches">
              <span v-for="s in skins" :key="s.label" class="swatch">
                <span class="dot" :style="{ background: s.c }"></span>{{ s.label }}
              </span>
            </div>
            <p class="theme-tip">
              右边就是现在的主题。本站也内置了它，右上角随时切。
              <button type="button" class="btn btn--primary btn--sm" @click="emit('toggle-theme')">
                现在就试试{{ theme === 'dark' ? '浅色' : '深夜' }}
              </button>
            </p>
          </div>

          <div class="reveal theme-slide" aria-hidden="true">
            <div class="theme-phone">
              <div class="theme-notch"></div>
              <img
                class="theme-shot"
                :src="theme === 'dark' ? '/shots/home_dark.png' : '/shots/home_light.png'"
                :alt="theme === 'dark' ? 'doit 深夜主题首页' : 'doit 浅色主题首页'"
                width="450"
                height="1000"
                loading="lazy"
                decoding="async"
              />
              <div class="theme-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.theme-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
}

/* 真机外壳：与 CoreFeatures / Products 的手机同一套语汇（刘海 + 深边 + 底部条） */
.theme-phone {
  position: relative;
  height: 436px;
  aspect-ratio: 450 / 1000;
  border: 6px solid var(--paper-deep);
  border-radius: 34px;
  background: var(--card);
  box-shadow: var(--shadow-lg), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: border-color 0.35s ease, box-shadow 0.35s ease;
}

.theme-shot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

.theme-notch {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 34%;
  height: 3.2%;
  border-radius: 999px;
  background: var(--paper-deep);
  z-index: 2;
}

.theme-bar {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 38%;
  height: 0.9%;
  border-radius: 999px;
  background: var(--ink-3);
  opacity: 0.5;
  z-index: 2;
}

@media (max-width: 620px) {
  .theme-phone {
    height: 360px;
  }
}
</style>
