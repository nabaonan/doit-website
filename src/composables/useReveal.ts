import { onMounted, onUnmounted } from 'vue'

/**
 * 主题开关：与 APP 设置页「浅色 / 深色」同款语义。
 * 记忆在 localStorage，默认跟随系统。
 */
export function useTheme() {
  const toggle = (mode: 'light' | 'dark') => {
    document.documentElement.dataset.theme = mode
    try {
      localStorage.setItem('doit-site-theme', mode)
    } catch {
      /* 隐私模式忽略 */
    }
  }

  return { toggle }
}

/**
 * 滚动显现：IntersectionObserver 一次性入场。
 * 尊重 prefers-reduced-motion（此时 CSS 已把 .reveal 强制可见）。
 */
export function useReveal(root: () => Element | null) {
  let io: IntersectionObserver | null = null
  const els: Element[] = []

  const observe = () => {
    const host = root()
    if (!host) return
    host.querySelectorAll('.reveal').forEach((el) => els.push(el))
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io?.unobserve(e.target)
            }
          })
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
      )
      els.forEach((el) => io!.observe(el))
    } else {
      els.forEach((el) => el.classList.add('in'))
    }
  }

  onMounted(observe)
  onUnmounted(() => io?.disconnect())

  return { observe }
}
