# Simple demo of using ServiceStack and Nuxt.js together

Modeled after <https://github.com/nuxt/example-auth0>, with a few additions (separation of
backend from frontend, http proxy in dev mode, role-based visibility and functionality ...)

## In this demo

- ServiceStack: [https://servicestack.net](https://servicestack.net) ([ServiceStack docs](http://docs.servicestack.net/))
- Nuxt: [https://nuxtjs.org](https://nuxtjs.org) ([Nuxt.js docs](https://github.com/nuxt/nuxt.js))
- Vue: [https://vuejs.org](https://vuejs.org) ([Vue.js docs](https://vuejs.org/v2/guide/))
- Vuex ([Vuex docs](https://vuex.vuejs.org/en/))

[![servicestack-nuxt-example-thumb-video](https://user-images.githubusercontent.com/1571516/27110517-847088b6-506f-11e7-886b-5e13215cf6c9.png)](https://vimeo.com/221513068)

## Development

### Install node packages

``` bash
# cd into the 'frontend' directory
$ cd frontend

# install dependencies
$ npm install # Or yarn install
```

### Run the ServiceStack backend (will automatically run dotnet restore, build, etc...)

To run ServiceStack, you'll need [.NET Core 3.1](https://dotnet.microsoft.com/download)

```bash
# start the ServiceStack backend in a terminal (from within the frontend directory)
$ npm run server
```

Alternatively, you can edit this script in 'package.json' to run dotnet watch, etc ...

### Run the frontend

```bash
# serve with hot reload at localhost:3000, uses http-proxy to connect to ServiceStack api at localhost:5000
# make sure the backend is started first (use a API_URL env variable for a different api location)
$ npm run dev
```

## Production

### Front-end deployed to Node container

```bash
# build for production and launch server (make sure the API_URL env variable is set)
$ npm run build
$ npm start
```

### Front-end deployed to ASP.NET CORE

Generate as a static project and merge the files into the ServiceStack asp.net project (generates and copies dist to wwwroot)

```bash
# (Optional) run the server so that required API calls are resolved during the generate process
npm run server
# generate the static app
npm run generate
```

Typically static pages would be generated against a remote API, in which case, setting an API_URL env variable
in the command above would make sense, and there is no need to ever run a local version of the backend locally.

Furthermore, you could then separate the backend into it's own repo and split up nicely the dev effort between
both for larger projects.

## Changelog

- 09/28/2020

  - Upgraded to Nuxt 2.14.5
  - Updated backend to aspnet core 3.1
  - Small refactors to simplify authentication a little further

- 01/08/2018

  - Upgraded to Nuxt v2.3.4
  - Updated backend to aspnet core 2.2
  - Updated ServiceStack to latest v5 version
  - Added @nuxtjs/axios, @nuxtjs/proxy, @nuxtjs/auth modules
  - Refactored auth to use the `auth` module (a simpler implementation as a result)

- 12/15/2017

  - Upgraded to ServiceStack v5

- 10/23/2017

  - Upgraded Nuxt.js to 1.0.0-rc11, and ServiceStack to 1.0.44

- 06/10/2017

  - Initial commit
