import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, transformerAttributifyJsx,
} from 'unocss'

export default defineConfig({
  theme: {
  },
  shortcuts: {
    'j-btn': 'text-18px h-48px w-100% bg-#ffd103 b-none text-black rounded-8px'
  },
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx(),
  ],
})
