<script setup lang="ts">
import { reactive } from 'vue'
import { Activity, ListTree, Flag } from 'lucide-vue-next'

// —— 右滑完成 demo：进度跟手生长，滑过 55% 松手即成 —
const state = reactive({
  fill: 0,
  dragging: false,
  done: false,
})

const SLIDE_LIMIT = 55

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v))
}

function onDown(e: PointerEvent) {
  if (state.done) return
  state.dragging = true
  ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
  update(e)
}

function onMove(e: PointerEvent) {
  if (!state.dragging) return
  update(e)
}

function update(e: PointerEvent) {
  const card = (e.currentTarget as Element).getBoundingClientRect()
  state.fill = clamp(((e.clientX - card.left) / card.width) * 100, 0, 100)
}

function onUp(e: PointerEvent) {
  if (!state.dragging) return
  state.dragging = false
  ;(e.currentTarget as Element).releasePointerCapture?.(e.pointerId)
  if (state.fill >= SLIDE_LIMIT) {
    state.done = true
    state.fill = 100
  } else {
    state.fill = 0
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    state.done = true
    state.fill = 100
  }
}

function reset() {
  state.done = false
  state.fill = 0
}

const features = [
  {
    title: '进度环 · 今天打完几件',
    desc: '首页右上角一圈，看着今天一点点填满。完成日期落在今天，才算进这一圈。',
  },
  {
    title: '子任务上拆',
    desc: '子任务全做完，父任务自动整体完成，逐级向上冒泡，不用手动逐层去点。',
  },
  {
    title: '优先级色点',
    desc: '低 / 普通 / 高 / 紧急，色相从冷到暖。一眼分清轻重，不靠读字。',
  },
]

const prios = [
  { label: '低', c: 'var(--prio-low)' },
  { label: '普通', c: 'var(--prio-mid)' },
  { label: '高', c: 'var(--prio-high)' },
  { label: '紧急', c: 'var(--prio-urgent)' },
]
</script>

<template>
  <section id="interact" class="section">
    <div class="container">
      <div class="reveal section-head">
        <span class="eyebrow">交互</span>
        <h2 class="section-title">一个勾，值得被认真对待。</h2>
        <p class="section-sub">完成不是点一下而已——进度跟手生长，走到一半反悔也来得及。</p>
      </div>

      <!-- 右滑完成 demo -->
      <div class="reveal demo">
        <div class="demo-head">
          <h4>右滑完成</h4>
          <span class="hint">按住卡片往右拖，滑过 55% 松手即成</span>
        </div>

        <div
          class="demo-card"
          tabindex="0"
          role="button"
          :aria-pressed="state.done"
          :aria-label="state.done ? '任务已完成，Enter 或点重置可再来一次' : '演示右滑完成，按住拖动'"
          @pointerdown="onDown"
          @pointermove="onMove"
          @pointerup="onUp"
          @pointercancel="onUp"
          @keydown="onKey"
        >
          <div
            class="demo-progress"
            :class="{ done: state.done, fill: state.fill > 0, ease: !state.dragging }"
            :style="{ width: state.fill + '%' }"
          ></div>

          <span class="demo-circle" :class="{ on: state.done }">
            <svg viewBox="0 0 24 24" fill="none"><path d="M6 12.4l3.8 3.8 8.2-9" /></svg>
          </span>

          <span class="demo-text" :class="{ done: state.done }">{{ state.done ? '今天的勾，打上了' : '写周报提纲' }}</span>

          <div class="demo-track" aria-hidden="true">
            <span class="thumb" :style="{ left: state.fill + '%' }"></span>
          </div>
        </div>

        <button v-if="state.done" type="button" class="demo-reset" @click="reset">再拖一次重来</button>
      </div>

      <!-- 三格：进度环 / 子任务上拆 / 优先级 -->
      <div class="features" style="margin-top: clamp(1.25rem, 3vw, 2rem)">
        <article class="feature reveal">
          <span class="feature-icon" aria-hidden="true">
            <Activity :size="21" :stroke-width="2.1" />
          </span>
          <h4>{{ features[0].title }}</h4>
          <p>{{ features[0].desc }}</p>
          <div class="ring-demo" aria-hidden="true">
            <svg class="ring-svg" width="66" height="66" viewBox="0 0 66 66">
              <circle cx="33" cy="33" r="30" />
              <circle class="prog" cx="33" cy="33" r="30" />
            </svg>
            <span class="ring-label"><b>7 / 9</b><br />今天已经打完</span>
          </div>
        </article>

        <article class="feature reveal">
          <span class="feature-icon" aria-hidden="true">
            <ListTree :size="21" :stroke-width="2.1" />
          </span>
          <h4>{{ features[1].title }}</h4>
          <p>{{ features[1].desc }}</p>
          <div class="up-bubbles" aria-hidden="true">
            <span class="bubble done"><span class="c off"></span><span class="t">收集素材</span></span>
            <span class="bubble done"><span class="c off"></span><span class="t">整理数据</span></span>
            <span class="bubble" data-role="parent"><span class="c on"></span>写周报 · 自动整体完成</span>
          </div>
        </article>

        <article class="feature reveal">
          <span class="feature-icon" aria-hidden="true">
            <Flag :size="21" :stroke-width="2.1" />
          </span>
          <h4>{{ features[2].title }}</h4>
          <p>{{ features[2].desc }}</p>
          <div class="prio-row">
            <span v-for="p in prios" :key="p.label" class="prio">
              <span class="dot" :style="{ background: p.c }"></span>{{ p.label }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
