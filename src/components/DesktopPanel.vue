<script setup lang="ts">
const features = [
  { t: '四种视图', d: '今日待办、日历浏览、时间轴、统计，回顾一目了然' },
  { t: '无限层级子任务', d: '父级勾选自动联动，子任务完成自动归位' },
  { t: '拖拽排序', d: '整棵子树跨层级挪动，FLIP 动画流畅' },
  { t: '分类与标签', d: '颜色自定，顶栏一键筛选' },
  { t: '到点提醒', d: '系统通知，随时清除' },
  { t: '本地 JSON 存储', d: '无账号离线可用，WebDAV 云备份 / 恢复' },
  { t: '快乐工作模式', d: '完成待办时撒下彩点' },
]

const views = [
  {
    t: '今日待办',
    d: '未完成 + 今天完成的清单',
    i: 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
    c: 'M12 8v4l3 2',
  },
  {
    t: '日历浏览',
    d: '有完成记录的日子带圆点',
    i: 'M3 5h18v16H3zM8 3v4M16 3v4M3 10h18',
    c: 'M7 15l3 3 5-6',
  },
  {
    t: '时间轴',
    d: '一条直线，串起每天的完成',
    i: 'M9 6h11M9 12h11M9 18h11',
    c: 'M4 6h1M4 12h1M4 18h1',
  },
  {
    t: '统计',
    d: '52 周热力图 / 月度柱状 / 环形图',
    i: 'M4 20V10M10 20V4M16 20v-7M21 20H3',
    c: '',
  },
]
</script>

<template>
  <section id="desktop" class="relative py-20 md:py-28">
    <div class="container-x">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div class="reveal">
          <p class="label">桌面版</p>
          <h2 class="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Doit GPUI
          </h2>
          <p class="mt-4 max-w-md leading-relaxed text-ink-soft">
            一款用纯 Rust + GPUI 写成的桌面待办。四种视图从容切换，完成记录生成热力图
            与统计，回顾一周像翻相册。
          </p>
          <ul class="mt-7 space-y-3">
            <li v-for="f in features" :key="f.t" class="flex gap-3 text-[15px]">
              <span class="check" aria-hidden="true">
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m5 13 4 4L19 7" />
                </svg>
              </span>
              <span class="leading-relaxed">
                <b class="font-semibold text-ink">{{ f.t }}</b>
                <span class="text-ink-soft"> — {{ f.d }}</span>
              </span>
            </li>
          </ul>
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a href="#download" class="btn-primary px-5 py-2.5">下载桌面版</a>
            <a
              href="https://github.com/nabaonan/doit-gpui"
              target="_blank"
              rel="noreferrer"
              class="btn-secondary px-5 py-2.5"
            >
              查看源码
            </a>
          </div>
        </div>

        <div class="reveal">
          <div class="views-grid">
            <div v-for="v in views" :key="v.t" class="view-card">
              <span class="view-icon" aria-hidden="true">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                  <path :d="v.i" />
                  <path v-if="v.c" :d="v.c" />
                </svg>
              </span>
              <h3 class="mt-3 text-[15px] font-semibold">{{ v.t }}</h3>
              <p class="mt-1 text-[13px] leading-relaxed text-ink-faint">{{ v.d }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.views-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
.view-card {
  border: 1px solid var(--line);
  background: var(--card);
  border-radius: 18px;
  padding: 20px;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
.view-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--brand) 45%, var(--line));
  box-shadow: var(--shadow);
}
.view-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--brand-soft);
  color: var(--brand-strong);
}
</style>
