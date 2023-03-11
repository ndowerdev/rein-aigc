import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import Previewer from 'virtual:vue-component-preview'

import VueClipboard from 'vue3-clipboard'

import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

// import '@unocss/reset/tailwind.css'
import 'vue-loading-overlay/dist/css/index.css'
import './styles/main.css'
// import 'uno.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'

const routes = setupLayouts(generatedRoutes)
// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))

    ctx.app.use(VueClipboard, {
      autoSetContainer: true,
      appendToBody: true,
    })
    ctx.app.use(Previewer)
  },
)
