import { setClient } from '~/utils/api'

export default ({ app }) => {
  app.$axios.onRequest((config) => {
    if (process.static) {
      // during the generate process, we're going to bypass the proxy all-together
      // config.url = process.env.API_URL + config.url
    }
  })

  setClient(app.$axios)
}
