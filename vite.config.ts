import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// base: './' —— 产物使用相对路径，兼容 GitHub Pages 任意子路径部署
export default defineConfig({
  base: './',
  plugins: [vue(), UnoCSS()],
  build: {
    target: 'es2020',
  },
})
