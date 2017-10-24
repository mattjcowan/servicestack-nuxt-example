import types from '~/utils/types'
import { getServerInfo } from '~/utils/api'

export const state = () => ({
  user: null,
  serverInfo: null
})

export const getters = {
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

export const actions = {
  [types.actions.setUser]: async ({ commit, state }, user) => {
    commit(types.mutations.setUser, user || null)
    // if the user is Admin, fetch server info if it hasn't already been loaded
    if (user && user.roles && user.roles.indexOf('Admin') > -1) {
      if (!state.serverInfo) commit(types.mutations.setServerInfo, (await getServerInfo()).result)
    } else {
      commit(types.mutations.setServerInfo, null)
    }
  }
}

export const mutations = {
  [types.mutations.setUser] (state, user) {
    state.user = user || null
  },
  [types.mutations.setServerInfo] (state, serverInfo) {
    state.server = serverInfo || null
  }
}
