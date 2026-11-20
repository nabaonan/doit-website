<script setup lang="ts">
// WebDAV 双向同步带：沿用 APP 顶部云按钮的四种状态文案
const states = [
  { label: '已同步', cls: 'ok' },
  { label: '有待同步', cls: 'warn' },
  { label: '同步中', cls: 'busy' },
  { label: '已关闭', cls: 'gray' },
]
</script>

<template>
  <section id="sync" class="section section--tight">
    <div class="container">
      <div class="reveal sync-card">
        <div class="sync-visual" aria-hidden="true">
          <svg viewBox="0 0 160 120" fill="none">
            <path
              class="cloud-body"
              d="M48 96c-16 0-28-11-28-25 0-12 9-22 21-24a30 30 0 0155-9c12 2 20 12 20 24 0 13-11 24-25 24z"
            />
            <path class="cloud-check" d="M66 84l9 9 18-20" />
            <path
              d="M40 34l10 10M34 28v10M50 28h10"
              stroke="var(--accent)"
              stroke-width="2.6"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <div class="sync-copy">
          <h3>手机记的，桌面继续。</h3>
          <p>
            在设置里开启 WebDAV，两端共用一个 <code>doit-backup.json</code>。双向合并、本地优先，不会丢掉任何一边的改动。
          </p>
          <div class="sync-states" aria-label="同步状态示例">
            <span v-for="s in states" :key="s.label" class="state-pill">
              <span class="sdot" :class="s.cls"></span>{{ s.label }}
            </span>
          </div>
        </div>
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
</style>
