import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * 构建期探测两个仓库的最新正式版号，注入为全局常量。
 *
 * 目的：首屏直接显示正确版本号（不闪一下再变），并在运行时 API 不可用时
 * 作为兜底值。探测失败则退回 FALLBACK，绝不构建失败。
 */
const FALLBACK = { apk: 'v1.0.14', desk: 'v0.1.4', tui: 'v0.1.0' }

async function latestTag(repo: string): Promise<string | null> {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(`https://api.github.com/repos/nabaonan/${repo}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: ctrl.signal,
    })
    clearTimeout(timer)
    if (!res.ok) return null
    const data = (await res.json()) as {
      tag_name?: string
      draft?: boolean
      prerelease?: boolean
    }
    if (data.draft || data.prerelease) return null
    return data.tag_name?.trim() || null
  } catch {
    return null
  }
}

async function resolveVersions() {
  const [apk, desk, tui] = await Promise.all([
    latestTag('doit-apk'),
    latestTag('doit-desktop'),
    latestTag('doit-tui'),
  ])
  return {
    apk: apk || FALLBACK.apk,
    desk: desk || FALLBACK.desk,
    tui: tui || FALLBACK.tui,
  }
}

const versions = await resolveVersions()

// base: './' —— 产物使用相对路径，兼容 GitHub Pages 任意子路径部署（./assets/...）
export default defineConfig({
  base: './',
  plugins: [vue()],
  define: {
    __APK_VERSION__: JSON.stringify(versions.apk),
    __DESK_VERSION__: JSON.stringify(versions.desk),
    __TUI_VERSION__: JSON.stringify(versions.tui),
  },
  build: {
    target: 'es2020',
  },
  server: {
    port: 5190,
    strictPort: true,
  },
  preview: {
    port: 5190,
    strictPort: true,
  },
})
