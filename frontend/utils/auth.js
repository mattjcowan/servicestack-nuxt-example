import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

export const getQueryParams = () => {
  const params = {}
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
}

export const extractInfoFromHash = () => {
  if (process.server) return
  const { id_token, state, redirect } = getQueryParams()
  return {
    token: id_token,
    secret: state,
    redirect: redirect
  }
}

export const setRefreshToken = (token) => {
  if (process.server) return
  window.localStorage.setItem('jwt-refresh', token)
  Cookies.set('jwt-refresh', token)
}

export const getRefreshToken = () => { return window.localStorage.getItem('jwt-refresh') }

export const setToken = (token) => {
  if (process.server) return
  window.localStorage.setItem('jwt', token)
  window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)))
  Cookies.set('jwt', token)
}

export const unsetToken = () => {
  if (process.server) return
  window.localStorage.removeItem('jwt')
  window.localStorage.removeItem('jwt-refresh')
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('secret')
  Cookies.remove('jwt')
  Cookies.remove('jwt-refresh')
  window.localStorage.setItem('logout', Date.now())
}

export const getUserFromLocalCache = (req) => {
  return getUserFromRequest(req) || getUserFromCookie() || getUserFromLocalStorage()
}

export const getUserFromCookie = () => {
  const jwtCookie = Cookies.get('jwt')
  if (!jwtCookie) return undefined
  return jwtDecode(jwtCookie)
}

export const getUserFromRequest = (req) => {
  if (!req || !req.headers || !req.headers.cookie) return undefined
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwtDecode(jwt)
}

export const getUserFromLocalStorage = () => {
  if (!window) return undefined
  const json = window.localStorage.user
  return json ? JSON.parse(json) : undefined
}
