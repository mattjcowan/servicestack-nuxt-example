// eslint-disable-next-line nuxt/no-cjs-in-config
// const pkg = require('./package.json')
import pkg from './package.json'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'ServiceStack + Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'shortcut icon', type: 'image/png', href: '/favicon.png' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['normalize.css', '~/assets/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/axios'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // Use the API_URL environment variable to use CORS
    // See https://axios.nuxtjs.org/options/
    proxy: true,
  },

  /*
   ** Proxy configuration
   */
  proxy: {
    '/api/': { target: 'http://localhost:5000' },
  },

  /*
   ** Auth configuration
   */
  auth: {
    plugins: ['~/plugins/auth.js'],
    redirect: {
      login: '/auth/sign-in',
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/credentials',
            method: 'post',
            propertyName: 'bearerToken',
          },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth', method: 'get', propertyName: false },
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
  },
}
