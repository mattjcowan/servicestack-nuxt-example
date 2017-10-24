module.exports = {
  head: {
    title: 'ServiceStack + Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/png', href: '/favicon.png' }
    ]
  },
  loading: { color: '#000' },
  router: {
    middleware: 'check-auth'
  },
  build: {
    extractCSS: true,
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    'normalize.css',
    '~/assets/main.scss'
  ],
  env: {
    baseUrl: process.env.BASE_URL || '',
    apiUrl: process.env.API_URL || 'http://localhost:5000'
  }
}
