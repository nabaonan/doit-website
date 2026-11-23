import { computed, ref } from 'vue'

/**
 * 版本号数据源：Android 与桌面端的最新正式版号。
 *
 * 策略：构建期探测一次写入产物（首屏即正确，不闪烁），运行时再用 GitHub
 * Releases API 刷新。匿名 API 限流 60 次/小时/IP，因此结果落 localStorage
 * 缓存一小时，避免每次刷新都打接口。取不到时保持构建期注入的值，不显示空。
 */

const CACHE_KEY = 'doit-site-versions'
const CACHE_TTL = 60 * 60 * 1000 // 1 小时

interface VersionInfo {
  /** 带 v 前缀的版本号，如 v1.0.14 */
  apk: string
  /** 带 v 前缀的版本号，如 v0.1.4 */
  desk: string
  /** 带 v 前缀的版本号，如 v0.1.0 */
  tui: string
  /** 带 v 前缀的版本号，如 v0.1.17 */
  gpui: string
}

interface CachePayload {
  savedAt: number
  info: VersionInfo
}

/** 构建期注入的兜底值，API 不可用时使用 */
const BAKED: VersionInfo = {
  apk: __APK_VERSION__,
  desk: __DESK_VERSION__,
  tui: __TUI_VERSION__,
  gpui: __GPUI_VERSION__,
}

const state = ref<VersionInfo>({ ...BAKED })
let started = false

function readCache(): CachePayload | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachePayload
    if (!parsed?.info?.apk || !parsed?.info?.desk || !parsed?.info?.tui || !parsed?.info?.gpui) return null
    if (Date.now() - parsed.savedAt > CACHE_TTL) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(info: VersionInfo) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), info }))
  } catch {
    /* 隐私模式忽略 */
  }
}

/** 拉取某个仓库的最新 release tag，取不到返回 null */
async function fetchLatestTag(repo: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/nabaonan/${repo}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null
    const data = (await res.json()) as { tag_name?: string; draft?: boolean; prerelease?: boolean }
    // 跳过草稿与预发布，避免把测试版当正式版展示
    if (data.draft || data.prerelease) return null
    return data.tag_name?.trim() || null
  } catch {
    return null
  }
}

/** 合并四个仓库的新版本号，任一失败则保留原值 */
async function refresh(): Promise<void> {
  const [apk, desk, tui, gpui] = await Promise.all([
    fetchLatestTag('doit-apk'),
    fetchLatestTag('doit-desktop'),
    fetchLatestTag('doit-tui'),
    fetchLatestTag('doit-gpui'),
  ])
  if (!apk && !desk && !tui && !gpui) return
  state.value = {
    apk: apk || state.value.apk,
    desk: desk || state.value.desk,
    tui: tui || state.value.tui,
    gpui: gpui || state.value.gpui,
  }
  writeCache(state.value)
}

function start() {
  if (started) return
  started = true

  // 缓存命中就直接用，不发请求
  const cached = readCache()
  if (cached) {
    state.value = cached.info
    return
  }

  // 缓存过期或不存在：后台刷新，不阻塞首屏
  void refresh()
}

/**
 * 返回全局共享的版本号。组件内直接绑定即可，
 * 多个组件只触发一次网络请求。
 */
export function useVersions() {
  start()
  return {
    apkVersion: computed(() => state.value.apk),
    deskVersion: computed(() => state.value.desk),
    tuiVersion: computed(() => state.value.tui),
    gpuiVersion: computed(() => state.value.gpui),
    /** 供调试：手动强制刷新 */
    refresh,
  }
}
