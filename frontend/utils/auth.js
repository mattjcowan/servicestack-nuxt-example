import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const getQueryParams = () => {
  const params = {}
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
}

export const extractInfoFromHash = () => {
  if (process.SERVER_BUILD) return
  const { id_token, state, redirect } = getQueryParams()
  return {
    token: id_token,
    secret: state,
    redirect: redirect
  }
}

export const setRefreshToken = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('refresh_token', token)
  Cookie.set('jwt-refresh', token)
}

export const getRefreshToken = () => { return window.localStorage.refresh_token }

export const setToken = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', token)
  const user = JSON.stringify(jwtDecode(token), null, '  ')
  window.localStorage.setItem('user', user)
  Cookie.set('jwt', token)
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('refresh_token')
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('secret')
  Cookie.remove('jwt')
  Cookie.remove('jwt-refresh')
  window.localStorage.setItem('logout', Date.now())
}

export const getUserFromCookie = (req) => {
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwtDecode(jwt)
}

export const getUserFromLocalStorage = () => {
  const json = window.localStorage.user
  return json ? JSON.parse(json) : undefined
}
