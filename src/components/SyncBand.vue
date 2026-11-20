<script setup lang="ts">
import { Cloud, RefreshCw, Check } from 'lucide-vue-next'

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
          <Cloud class="sync-cloud" :size="168" :stroke-width="1.5" />
          <span class="sync-badge">
            <Check :size="34" :stroke-width="3" />
          </span>
          <RefreshCw class="sync-refresh" :size="26" :stroke-width="2.2" />
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

.sync-visual {
  position: relative;
}

.sync-cloud {
  color: var(--accent);
  fill: var(--accent-soft);
}

.sync-badge {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--accent-ink);
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow);
}

[data-theme='dark'] .sync-badge {
  background: var(--accent);
  color: var(--on-accent);
}

.sync-refresh {
  position: absolute;
  top: 4px;
  right: 14%;
  color: var(--accent-ink);
}

@media (max-width: 560px) {
  .sync-refresh {
    right: 8%;
  }
}
</style>
