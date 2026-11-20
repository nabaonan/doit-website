# Doit 官网（doit-website）

[doit-apk](https://github.com/nabaonan/doit-apk)（Android 待办）与 [doit-desktop](https://github.com/nabaonan/doit-desktop)（桌面端）的官方主页。

- 纯静态单页：Vite + Vue 3 + TypeScript
- 配色取色自 APP 设计令牌 `DoitPalette`（浅色薄荷 Mint / 深色深夜青灰 Midnight），十六进制原样使用，整站明暗双主题实时切换
- 整站词汇沿用 APP 自己的「圆 + 勾」图标语汇与产品口气文案：巨型青绿圈打勾、右滑完成交互 demo、热力图/环形/折线迷你视觉、WebDAV 双向同步带
- 产物使用相对路径（`base: './'`），可部署到 GitHub Pages 任意子路径

## 本地开发

```bash
pnpm install
pnpm dev        # 开发预览
pnpm build      # 构建到 dist/
pnpm preview    # 本地预览构建产物
```

## 部署（GitHub Pages）

推送到 `main` 分支后，仓库里的 `.github/workflows/deploy.yml` 会自动构建并把 `dist/` 发布到 GitHub Pages。

1. 在仓库 Settings → Pages → **Source** 选择 **GitHub Actions**；
2. 之后每次推送 `main` 都会自动发布（也可在 Actions 里手动 `workflow_dispatch`）。

因为用的是相对路径，无论部署在 `https://<user>.github.io/doit-website/` 还是作为根站点，都不需要改配置。

## 目录结构

```
doit-website/
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署（push main 触发）
├── public/                        # favicon、robots.txt、.nojekyll
├── src/
│   ├── components/                # 顶栏、hero、双端对照、交互 demo、统计、主题带、同步、页脚
│   ├── composables/useReveal.ts   # IntersectionObserver 一次性滚动入场
│   ├── App.vue / main.ts / style.css  # 根组件、入口、设计令牌（明/暗两套）+ 全局样式
└── index.html
```
