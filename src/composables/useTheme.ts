import { ref } from 'vue'

const isDark = ref(
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
)

export function useTheme() {
  function apply(dark: boolean) {
    isDark.value = dark
    document.documentElement.classList.toggle('dark', dark)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', dark ? '#0e120f' : '#f4f7f2')
  }

  function init() {
    let stored: string | null = null
    try {
      stored = localStorage.getItem('doit-theme')
    } catch {
      /* ignore */
    }
    const prefers = window.matchMedia('(prefers-color-scheme: dark)')
    apply(stored ? stored === 'dark' : prefers.matches)
    prefers.addEventListener('change', (e) => {
      let s: string | null = null
      try {
        s = localStorage.getItem('doit-theme')
      } catch {
        s = null
      }
      if (!s) apply(e.matches)
    })
  }

  function toggle() {
    const next = !isDark.value
    try {
      localStorage.setItem('doit-theme', next ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
    apply(next)
  }

  return { isDark, init, toggle }
}
