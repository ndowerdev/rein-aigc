import { type UserModule } from '~/types'
import { pb } from '~/composables/database'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, _from, _next) => {
      const requiresAuth = to.meta.requiresAuth
      if (requiresAuth && !pb.authStore.isValid)
        router.push('/auth/login')
      else
        _next()

      // your auth logic
    })
  }
}
