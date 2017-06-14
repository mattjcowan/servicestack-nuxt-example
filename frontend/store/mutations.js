import types from './types'

export default {
  [types.mutations.setUser] (state, user) {
    state.user = user || null
  },
  [types.mutations.setServerInfo] (state, serverInfo) {
    state.server = serverInfo || null
  }
}
