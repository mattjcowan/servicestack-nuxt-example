const Nuxt = require('nuxt')
const morgan = require('morgan')
const httpProxy = require('http-proxy')
const app = require('express')()
const argv = require('minimist')(process.argv.slice(2))

require('dotenv').config()

const isDev = (process.env.NODE_ENV !== 'production')
const apiUrl = argv.api || process.env.API_URL

if (!apiUrl || apiUrl.length === 0) {
  console.error('!! WARNING\nMissing URL to the api. Please set an API_URL environment variable or pass --api as a parameter to \'node server.js --api https://path.to.api\'\n')
  return
}

// log requests
app.use(morgan('combined'))

// do other stuff in express here
// app.use(express.static(__dirname));

// see: https://github.com/nodejitsu/node-http-proxy/blob/master/lib/http-proxy.js#L33-L50
console.log('Setting up proxy to ' + apiUrl)
const proxy = httpProxy.createProxyServer({})

app.use(function (req, res, next) {
  const prefixes = ['/api', '/event', '/metadata', '/openapi', '/swagger', '/resources']
  for (let prefix of prefixes) {
    if (req.url.indexOf(prefix) === 0) {
      // fetch cookies
      const cookies = {}
      if (apiUrl.indexOf('localhost') === -1) {
        req.headers.cookie && req.headers.cookie.split(';').forEach(function (cookie) {
          var parts = cookie.split('=')
          cookies[ parts[ 0 ].trim() ] = (parts[ 1 ] || '').trim()
        })
      }

      // intercept JWT cookie when using JWT auth, and pass it on to ServiceStack when proxying
      const options = { target: apiUrl, secure: false, changeOrigin: true, autoRewrite: true }
      if (cookies['jwt']) {
        console.log('Bearer ' + cookies['jwt'])
        options.headers = { 'Authorization': 'Bearer ' + cookies['jwt'] }
      }
      proxy.web(req, res, options)
      return
    }
  }
  next()
})

proxy.on('error', function (error, req, res) {
  console.log('proxy error' + error.message)
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' })
  }
  const json = { error: 'proxy_error', reason: error.message }
  res.end(JSON.stringify(json))
})

const port = process.env.PORT || 3000

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js')
config.dev = isDev
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

// Listen the server
app.listen(port)
console.log('Server listening on localhost:' + port)

