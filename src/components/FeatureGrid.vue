<script setup lang="ts">
const items = [
  {
    t: '子任务无限层级',
    d: '父级勾选联动全部子树，子任务完成自动归位',
    i: 'm12 3 9 5-9 5-9-5 9-5Z',
    i2: 'm3 13 9 5 9-5',
  },
  {
    t: '拖拽排序',
    d: '跨层级挪动整棵子树，FLIP 动画顺滑',
    i: 'M9 6h6M9 12h6M9 18h6',
    i2: '',
  },
  {
    t: '分类与标签',
    d: '颜色自定，标签多挂，顶栏一键筛选',
    i: 'm3 12 9-9h9v9l-9 9L3 12Z',
    i2: 'M17 7h.01',
  },
  {
    t: '本地优先',
    d: '数据存在你的设备里，无账号、离线可用',
    i: 'M12 5.5a7.5 7.5 0 0 0-7.5 7.5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3a7.5 7.5 0 0 0-7.5-7.5Z',
    i2: 'M4.5 13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3',
  },
  {
    t: 'WebDAV 云同步',
    d: '备份与恢复，密码在本机加密保存',
    i: 'M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 9.5a3.5 3.5 0 0 1 .5 8.5H7Z',
    i2: '',
  },
  {
    t: '统计复盘',
    d: '热力图、月度柱状、日报周报，进步看得见',
    i: 'M4 20V10M10 20V4M16 20v-7M21 20H3',
    i2: '',
  },
  {
    t: '深色模式',
    d: '跟随系统，浅深即时切换',
    i: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
    i2: '',
  },
  {
    t: '多格式导出',
    d: '复制、Markdown、PDF，随手带走（桌面端）',
    i: 'M12 3v12m0 0 5-5m-5 5-5-5M4 21h16',
    i2: '',
  },
]
</script>

<template>
  <section id="features" class="relative py-20 md:py-28">
    <div class="container-x">
      <div class="reveal mx-auto max-w-2xl text-center">
        <p class="label">功能亮点</p>
        <h2 class="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
          两个端，一套顺手
        </h2>
        <p class="mt-4 leading-relaxed text-ink-soft">
          子任务、标签、统计、同步——桌面与移动端共享一致的能力与"数据在你手里"的理念。
        </p>
      </div>

      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="f in items" :key="f.t" class="reveal card p-5 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
          <span class="view-icon" aria-hidden="true">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path :d="f.i" />
              <path v-if="f.i2" :d="f.i2" />
            </svg>
          </span>
          <h3 class="mt-4 text-[15px] font-semibold">{{ f.t }}</h3>
          <p class="mt-1.5 text-[13px] leading-relaxed text-ink-faint">{{ f.d }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
