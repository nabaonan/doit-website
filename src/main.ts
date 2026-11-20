import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// 主题在 Vue 挂载前先落地到 <html>，避免首帧闪色
const THEME_KEY = 'doit-site-theme'
function applyTheme() {
  const stored = localStorage.getItem(THEME_KEY)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const next = stored === 'dark' || stored === 'light' ? stored : prefersDark ? 'dark' : 'light'
  document.documentElement.dataset.theme = next
  return next
}
applyTheme()

createApp(App).mount('#app')

export { THEME_KEY, applyTheme }
