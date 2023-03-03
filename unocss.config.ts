import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['input-1', 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5   dark:placeholder-gray-400 dark:text-white'],
    ['label-1', 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'],
    ['table-th', 'px-6 py-3 border-b border-gray-500 bg-gray-700 text-white text-left text-xs leading-4 font-medium  uppercase tracking-wider'],
    ['table-th-empty', 'px-6 py-3 border-b border-gray-200 bg-gray-50'],
  ],

  theme: {
    colors: {
      pastelorange: '#FFA351FF',
      leftcolor: '#97BC62FF',
      rightcolor: '#2C5F2D',
      raspberry: '#8A307F',

      peach: '#FFBE7BFF',
      brand: {
        primary: 'hsla(var(--hue, 217), 78%, 51%)', // class="bg-brand-primary"
      },
    },

  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
