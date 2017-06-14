import types from './types'
import { getServerInfo } from '~/utils/api'

export default {
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
