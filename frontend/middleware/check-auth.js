import { getUserFromLocalCache } from '~/utils/auth'
import types from '~/utils/types'

export default function ({ store, req }) {
  // If running 'nuxt generate', then ignore the middleware, user will always be logged out
  // unless you want to run static site generation under a specific account
  if (process.server && !req) return
  const user = getUserFromLocalCache(req)
  store.dispatch(types.actions.setUser, user)
}
