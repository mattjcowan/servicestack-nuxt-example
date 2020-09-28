import types from '~/utils/types'

export const state = () => ({})

export const getters = {
  [types.getters.isAuthenticated]: (state) => {
    return state.auth.loggedIn
  },
  [types.getters.isAdmin]: (state) => {
    return (
      state.auth.user &&
      state.auth.user.roles &&
      state.auth.user.roles.includes('Admin')
    )
  },
  [types.getters.getUser]: (state) => {
    return state.auth.user
  },
}

export const actions = {}

export const mutations = {}
