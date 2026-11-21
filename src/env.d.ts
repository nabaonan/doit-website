/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/** 构建期由 vite.config.ts 注入的最新版本号（带 v 前缀） */
declare const __APK_VERSION__: string
declare const __DESK_VERSION__: string
