/**
 * 主题截图预加载 + 淡切。
 *
 * 官网保留亮/暗两套真实截图（invert/brightness 反色会毁掉品牌色），
 * 用「提前预加载 + 切换时交叉淡化」消除切换延迟：
 *  - prefetchThemeShots() 把目标主题的全部截图用 new Image() 拉进浏览器缓存，
 *    之后 <img> 换 src 时直接读缓存，无网络等待；
 *  - 触发时机：页面空闲预载「非当前主题」、鼠标悬停主题按钮预载目标主题（最可能动作），
 *    setTheme 切换时再兜底一次。
 *  - 淡切：图片 src 变化瞬间加 .shot-fade（opacity 0.4 → 1，180ms）。
 */

const SHOT_GROUPS: Array<[light: string, dark: string]> = [
  ['home_light', 'home_dark'],
  ['desk_today', 'desk_today_dark'],
  ['tui_light', 'tui_dark'],
  ['gpui_light', 'gpui_dark'],
  ['stats_cards', 'stats_cards_dark'],
  ['settings_tab_sync', 'settings_tab_sync_dark'],
]

/** 拼 base 前缀，兼容 GitHub Pages 子路径 */
function url(name: string) {
  return `${import.meta.env.BASE_URL}shots/${name}.png`
}

/** 按主题取该主题下所有截图 URL（去重） */
function themeUrls(theme: 'light' | 'dark'): string[] {
  return SHOT_GROUPS.map(([l, d]) => (theme === 'dark' ? d : l)).map(url)
}

let prefetched: Set<string> = new Set()

/**
 * 预加载指定主题的全部截图到浏览器缓存。
 * 用 <img> 零成本触发下载（不入 DOM），过后真正的 <img src> 命中缓存。
 */
export function prefetchThemeShots(theme: 'light' | 'dark') {
  const urls = themeUrls(theme)
  for (const u of urls) {
    if (prefetched.has(u)) continue
    const img = new Image()
    img.decoding = 'async'
    img.src = u
    prefetched.add(u)
  }
}

/** 挂载后空闲时预载「非当前主题」，让切主题几乎零等待 */
export function idlePrefetch(other: 'light' | 'dark') {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => prefetchThemeShots(other), { timeout: 1500 })
  } else {
    setTimeout(() => prefetchThemeShots(other), 800)
  }
}

/** 淡切标记：给 <img> 加 .shot-fade 后 180ms 移除 */
export function fadeInImg(el: HTMLImageElement | null) {
  if (!el) return
  el.classList.remove('shot-fade')
  // 强制 reflow 后加类，让 opacity 过渡生效
  void el.offsetWidth
  el.classList.add('shot-fade')
}
