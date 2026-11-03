<script setup lang="ts">
const features = [
  { t: '四个主 Tab', d: '今日、记录、统计、设置，路径清爽' },
  { t: '分类即滤片', d: '一组颜色标签，按住即可筛选' },
  { t: '今日进度卡片', d: '完成几项，一眼便知' },
  { t: '到点通知', d: '事项前的本地提醒' },
  { t: '深色模式', d: '跟随系统，浅深随你' },
  { t: '本地存储', d: '数据留在设备，离线也能记' },
]

const tabs = [
  { t: '今日', active: true },
  { t: '记录', active: false },
  { t: '统计', active: false },
  { t: '设置', active: false },
]
</script>

<template>
  <section id="mobile" class="bg-page relative py-20 md:py-28">
    <div class="container-x">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div class="reveal order-2 lg:order-1">
          <div class="mx-auto w-fit" aria-label="Doit Mobile 界面示意">
            <div class="phone-shell">
              <div class="mock-screen">
                <div class="mock-head">
                  <div class="text-lg font-bold">今天</div>
                  <div class="text-[11px] text-[#9aa2a0]">11月2日 周一 · 6 项待办</div>
                </div>

                <div class="mock-progress">
                  <div class="flex items-baseline gap-1">
                    <span class="text-lg font-bold">0</span>
                    <span class="text-[11px] text-[#9aa2a0]">/ 6 · 今日完成</span>
                  </div>
                  <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e3f5ec]">
                    <div class="h-full w-[18%] rounded-full bg-[#40ce8e]" />
                  </div>
                </div>

                <div v-for="i in 4" :key="i" class="mock-task" :class="{ done: i === 2 }">
                  <span class="mock-check" :class="{ on: i === 2 }" />
                  <div class="min-w-0 flex-1">
                    <div class="h-3 w-[78%] rounded bg-current opacity-70" />
                    <div v-if="i % 2 === 0" class="mt-1.5 h-2 w-[46%] rounded bg-current opacity-30" />
                  </div>
                  <span class="mock-pill" :class="`pill-${i % 3}`" />
                </div>
              </div>
              <div class="mock-tabbar">
                <span v-for="tab in tabs" :key="tab.t" class="mock-tab" :class="{ on: tab.active }">
                  <span class="h-2.5 w-2.5 rounded-[4px] border-2 border-current" />
                  {{ tab.t }}
                </span>
              </div>
              <span class="mock-fab" aria-hidden="true">+</span>
            </div>
          </div>
        </div>

        <div class="reveal order-1 lg:order-2">
          <p class="label">移动端</p>
          <h2 class="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Doit Mobile
          </h2>
          <p class="mt-4 max-w-md leading-relaxed text-ink-soft">
            为手机而生的待办：今日、记录、统计、设置，四个 Tab 直达主路径。随手记、
            到点提醒、深色跟随系统，数据留在你自己的设备上。
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
            <a href="#download" class="btn-primary px-5 py-2.5">下载移动端</a>
            <a
              href="https://github.com/nabaonan/doit-mobile"
              target="_blank"
              rel="noreferrer"
              class="btn-secondary px-5 py-2.5"
            >
              查看源码
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.phone-shell {
  position: relative;
  width: 268px;
  border-radius: 40px;
  border: 8px solid #11151a;
  background: #f1f6f3;
  box-shadow: var(--shadow);
  overflow: hidden;
}
.mock-screen {
  color: #1a1d1b;
  padding: 18px 14px 12px;
}
.mock-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 2px;
}
.mock-progress {
  margin-top: 14px;
  border-radius: 16px;
  background: #fff;
  padding: 12px 14px;
  box-shadow: 0 2px 10px -4px rgba(20, 60, 40, 0.14);
}
.mock-task {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  border-radius: 14px;
  background: #fff;
  padding: 12px 10px;
  box-shadow: 0 2px 10px -5px rgba(20, 60, 40, 0.12);
}
.mock-task.done {
  color: #b0b8b3;
}
.mock-check {
  flex: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.6px solid #cbd8d2;
}
.mock-check.on {
  background: #40ce8e;
  border-color: #40ce8e;
}
.mock-pill {
  flex: none;
  width: 30px;
  height: 15px;
  border-radius: 999px;
}
.pill-0 {
  background: #e2f7ec;
}
.pill-1 {
  background: #e9f0fd;
}
.pill-2 {
  background: #efebfa;
}
.mock-tabbar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  padding: 10px 4px 12px;
  border-top: 1px solid #eef1ee;
}
.mock-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: #9aa2a0;
}
.mock-tab.on {
  color: #40ce8e;
}
.mock-fab {
  position: absolute;
  right: 14px;
  bottom: 58px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #3acd88;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1;
  box-shadow: 0 6px 16px -4px rgba(58, 205, 136, 0.6);
}
@media (max-width: 639px) {
  .phone-shell {
    width: 236px;
  }
}
</style>
