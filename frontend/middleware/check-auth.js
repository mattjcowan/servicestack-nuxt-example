import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'
import types from '~/store/types'

export default function ({ isServer, store, req }) {
  // If running 'nuxt generate', then ignore the middleware, user will always be logged out
  // unless you want to run static site generation under a specific account
  if (isServer && !req) return
  const user = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  store.dispatch(types.actions.setUser, user)
}
