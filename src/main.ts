import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.css'
import App from './App.vue'
import { useTheme } from './composables/useTheme'

const { init } = useTheme()
init()

createApp(App).mount('#app')
