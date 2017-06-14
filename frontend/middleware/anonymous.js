import types from '../store/types'

// middleware to ensure user is anonymous, otherwise redirect the user (useful for a login page for example)

export default function ({ store, redirect }) {
  if (store.getters[types.getters.isAuthenticated]) {
    return redirect('/')
  }
}
