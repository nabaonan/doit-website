import type { Directive } from 'vue'

/**
 * v-fade-load：截图加载完成后加 .loaded，触发 CSS 淡入。
 * 配合全局规则 .phone-frame img / .desk-frame img / ... 的
 * opacity:0 → 1 过渡，让主题切换后新图平滑淡入、不闪旧图。
 */
export const fadeLoad: Directive<HTMLImageElement> = {
  mounted(el) {
    if (el.complete && el.naturalWidth > 0) {
      el.classList.add('loaded')
      return
    }
    const onLoad = () => el.classList.add('loaded')
    el.addEventListener('load', onLoad, { once: true })
  },
}
