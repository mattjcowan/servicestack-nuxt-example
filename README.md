# Simple demo of using ServiceStack and Nuxt.js together

Modeled after https://github.com/nuxt/example-auth0, with a few additions (separation of 
backend from frontend, static/ssr page example, http proxy, role-based visibility and functionality ...)



## In this demo

-  ServiceStack: [https://servicestack.net](https://servicestack.net) ([ServiceStack docs](http://docs.servicestack.net/))
-  Nuxt: [https://nuxtjs.org](https://nuxtjs.org) ([Nuxt.js docs](https://github.com/nuxt/nuxt.js))
-  Vue: [https://vuejs.org](https://vuejs.org) ([Vue.js docs](https://vuejs.org/v2/guide/))
    - Vuex ([Vuex docs](https://vuex.vuejs.org/en/))

## Development

### Install node packages

``` bash
# cd into the 'frontend' directory
$ cd frontend

# install dependencies
$ npm install # Or yarn install
```

### Run the ServiceStack backend (will automatically run dotnet restore, build, etc...)

```bash
# start the ServiceStack backend in a terminal (from within the frontend directory)
$ npm run server
```

Alternatively, you can edit this script in 'package.json' to run dotnet watch, etc ...

### Run the frontend

```bash
# serve with hot reload at localhost:3000, uses http-proxy to connect to ServiceStack api at localhost:5000
# make sure the backend is started first
$ npm run dev:local

# optionally serve with hot reload pointing to a live API url (make sure the API_URL env variable is set,
# uses http-proxy to connect to ServiceStack api)
$ npm run dev
```

## Production

### Front-end deployed to Node container

```bash
# build for production and launch server (make sure the API_URL env variable is set)
$ npm run build
$ npm start
```

### Front-end deployed to ASP.NET

```bash
# generate static project and merge into ServiceStack asp.net project (generates and copies dist to wwwroot)
$ npm run server
$ cross-env API_URL=http://localhost:5000 npm run generate
```

Typically static pages would be generated against a remote API, in which case, setting an API_URL env variable
in the command above would make sense, and there is no need to ever run a local version of the backend locally.

Furthermore, you could then separate the backend into it's own repo and split up nicely the dev effort between
both for larger projects.
