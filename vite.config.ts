import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base: './' —— 产物使用相对路径，兼容 GitHub Pages 任意子路径部署（./assets/...）
export default defineConfig({
  base: './',
  plugins: [vue()],
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
