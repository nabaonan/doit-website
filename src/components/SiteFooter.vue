<script setup lang="ts">
import { useVersions } from '../composables/useVersions'

const APK_URL = 'https://github.com/nabaonan/doit-apk'
const DESK_URL = 'https://github.com/nabaonan/doit-desktop'
const TUI_URL = 'https://github.com/nabaonan/doit-tui'
const APK_REL = APK_URL + '/releases/latest'
const DESK_REL = DESK_URL + '/releases/latest'
const TUI_REL = TUI_URL + '/releases/latest'

const { apkVersion, deskVersion, tuiVersion } = useVersions()
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-big">
        <a class="fb-mark" href="#top">
          <span class="mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6.5 12.5l3.6 3.6 7.4-8.2" />
            </svg>
          </span>
          <b>doit</b>
        </a>
        <p class="footer-tag">今天的事，今天打完勾。一款薄荷绿的待办，手机、桌面和终端都跟你一起完成。</p>
      </div>

      <div class="footer-cols">
        <div class="footer-col">
          <h5>产品</h5>
          <a href="#products">三端对比</a>
          <a href="#interact">交互</a>
          <a href="#stats">统计</a>
          <a href="#theme">主题</a>
          <a href="#sync">同步</a>
        </div>
        <div class="footer-col">
          <h5>下载</h5>
          <a :href="APK_REL" target="_blank" rel="noopener">Android · APK</a>
          <a :href="DESK_REL" target="_blank" rel="noopener">桌面端 · macOS</a>
          <a :href="DESK_REL" target="_blank" rel="noopener">桌面端 · Windows</a>
          <a :href="DESK_REL" target="_blank" rel="noopener">桌面端 · Linux</a>
          <a :href="TUI_REL" target="_blank" rel="noopener">终端版 · tui</a>
        </div>
        <div class="footer-col">
          <h5>仓库</h5>
          <a :href="APK_URL" target="_blank" rel="noopener">doit-apk · Android 源码</a>
          <a :href="DESK_URL" target="_blank" rel="noopener">doit-desktop · 桌面端源码</a>
          <a :href="TUI_URL" target="_blank" rel="noopener">doit-tui · 终端版源码</a>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 doit · 开源项目</span>
        <span class="vers">
          <span>Android {{ apkVersion }}</span>
          <span>桌面端 {{ deskVersion }}</span>
          <span>终端版 {{ tuiVersion }}</span>
          <span>WebDAV 双向同步</span>
        </span>
      </div>
    </div>
  </footer>
</template>
