const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'ServiceStack + Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/png', href: '/favicon.png' }
    ]
  },

  /*
  ** Global env variables
  */
  env: {
    API_URL: process.env.API_URL || 'http://localhost:5000'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#000' },

  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    '~/assets/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },

  /*
  ** Proxy configuration
  */
  proxy: {
    '/api/': {
      target: process.env.API_URL || 'http://localhost:5000',
      credentials: true
    }
  },

  /*
  ** Auth configuration
  */
  auth: {
    plugins: [ '~/plugins/auth.js' ],
    redirect: {
      login: '/auth/sign-in',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/credentials', method: 'post', propertyName: 'bearerToken' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/me', method: 'get', propertyName: 'result' }
        }
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
