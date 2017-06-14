import types from './types'

export default {
  [types.getters.isAuthenticated]: (state) => {
    return !!state.user
  },
  [types.getters.isAdmin]: (state) => {
    return state.user && state.user.roles && state.user.roles.indexOf('Admin') > -1
  },
  [types.getters.getUser]: (state) => {
    return state.user
  }
}
