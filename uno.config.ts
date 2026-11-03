import { defineConfig, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerDirectives()],
  // 语义色全部走 CSS 变量，`.dark` 一键切换
  theme: {
    colors: {
      bg: 'var(--bg)',
      page: 'var(--page)',
      card: 'var(--card)',
      ink: 'var(--ink)',
      'ink-soft': 'var(--ink-soft)',
      'ink-faint': 'var(--ink-faint)',
      line: 'var(--line)',
      brand: 'var(--brand)',
      'brand-strong': 'var(--brand-strong)',
      'brand-soft': 'var(--brand-soft)',
      halo: 'var(--halo)',
    },
    fontFamily: {
      sans: 'var(--font-sans)',
      display: 'var(--font-display)',
    },
  },
  shortcuts: {
    'container-x': 'mx-auto w-full max-w-6xl px-5 md:px-8',
    btn: 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
    'btn-primary': 'btn bg-brand text-white shadow-sm hover:bg-brand-strong active:scale-[.98]',
    'btn-secondary': 'btn border border-line bg-card text-ink hover:border-brand/50 hover:text-brand',
    label: 'text-[13px] font-semibold tracking-wide text-brand',
    chip: 'rounded-full border border-line bg-card px-2.5 py-1 text-xs text-ink-soft',
    card: 'rounded-2xl border border-line bg-card',
  },
})
