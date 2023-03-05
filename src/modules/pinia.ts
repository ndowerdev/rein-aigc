import { createPinia } from 'pinia'
import { type UserModule } from '~/types'

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ isClient, initialState, app }) => {
  const pinia = createPinia()
  pinia.use((context) => {
    // console.log(context)

    // listen changes and update locals storage
    const storeId = context.store.$id

    const serialiser = {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    }
    if (typeof window !== 'undefined') {
      const fromStorage = serialiser.deserialize(window.localStorage.getItem(storeId))
      if (fromStorage)
        context.store.$patch(fromStorage)

      context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, serialiser.serialize(state))
      })
    }
  })

  app.use(pinia)
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient)
    pinia.state.value = (initialState.pinia) || {}

  else
    initialState.pinia = pinia.state.value
}
