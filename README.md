# Doit 官网（doit-website）

[Doit](https://github.com/nabaonan/doit) 极简待办应用的官方网站，介绍桌面端 **Doit GPUI** 与移动端 **Doit Mobile**。

- 纯静态单页：Vite + Vue 3 + TypeScript + UnoCSS
- 浅色 / 深色双主题，附首屏防闪烁处理
- 产物使用相对路径（`base: './'`），可部署到 GitHub Pages 任意子路径

## 本地开发

```bash
pnpm install
pnpm dev        # 开发预览
pnpm build      # 类型检查 + 构建到 dist/
pnpm preview    # 本地预览构建产物
```

> 需要 pnpm ≥ 9（lockfile 为 v9）。项目未固定 `packageManager`，本地直接用你自己装的 pnpm 即可（Intel Mac 用户不受 pnpm 11 无 darwin-x64 二进制的切换问题影响）。

## 部署（GitHub Pages）

推送到 `main` 分支后，仓库里的 `.github/workflows/deploy.yml` 会自动构建并把 `dist/` 发布到 GitHub Pages。

1. 在仓库 Settings → Pages → **Source** 选择 **GitHub Actions**；
2. 之后每次推送 `main` 都会自动发布（也可在 Actions 里手动 `workflow_dispatch`）。

因为用的是相对路径，无论部署在 `https://<user>.github.io/doit-website/` 还是作为根站点，都不需要改配置。

## 目录结构

```
doit-website/
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
├── public/                        # favicon、robots.txt、.nojekyll
├── src/
│   ├── assets/                    # 产品真实截图（来自 doit-gpui / doit-mobile）
│   ├── components/                # 导航、首屏装置、PC/移动章节、功能、下载、页脚
│   ├── composables/useTheme.ts    # 浅深主题（跟随系统 + 本地记忆）
│   ├── App.vue / main.ts / style.css / uno.config.ts
└── index.html
```

> 截图素材分别取自 [doit-gpui](https://github.com/nabaonan/doit-gpui) 与 [doit-mobile](https://github.com/nabaonan/doit-mobile) 的真实运行界面。
