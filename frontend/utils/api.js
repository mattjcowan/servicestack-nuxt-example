import axios from '~/plugins/axios'

export const register = async (username, firstname, lastname, displayname, email, password) => {
  return (await axios.post('/api/auth/register', { username, firstname, lastname, displayname, email, password, autologin: false })).data
}

/* Sample response:
{
  "userId": "1",
  "sessionId": "v96NPtvjNeUdZ0dld5vJ",
  "userName": "admin",
  "displayName": "admin",
  "bearerToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InkwdSJ9.eyJpc3MiOiJzc2p3dCIsInN1YiI6MSwiaWF0IjoxNDk3MjkzMzQ0LCJleHAiOjE0OTg1MDI5NDQsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiQWRtaW4iXX0.T0ciDez1_ekiR6kJBLDm7uOhCKCmuWF054Li004jFvO9lbRfytT8wiS4g2RVyka-RrwWcMyvBk6XVHwJmhn34MYBE9JvHxvG5jUDVOZy8yj79Khadhl9SttQTZka_sY2zLqvBaRhYGn1OHY4brTDTLwAOpZD72oMnOfZ-0d8rN5XqlN7J2ANGBdWMh9z4hWKCx9pi4dov-Qc0Eka5IyK5aNt2c5imiea_MdmfabVk3s4ce2INZTAFC7CVCt1tvSMQ-j8i9Ur3LmlInbS5AqqrC6SigjSmO4-fQTmBjAy9NGKsF0PAn8idd4SeiCk3CI9N4sBYWZ-VBowFnlnAeVcBQ",
  "refreshToken": "eyJ0eXAiOiJKV1RSIiwiYWxnIjoiUlMyNTYiLCJraWQiOiJ5MHUifQ.eyJzdWIiOjEsImlhdCI6MTQ5NzI5MzM0NCwiZXhwIjoxNTI4ODI5MzQ0fQ.OTuCt9R8v6ddLtz1estdmZKk3hEiLwGMSlc0T0Uy2rHfCxaAMGfQvsZvjE7c3rNQb-9iUSCCRvE5kcPK8RDT4gSeVNy-cM6xzEtftz7jncKy9LUBInGcI7QCrrxd-aWp60r-OCeIBvcNWGDAMwPsR10fkB3c9psP1Fz1F-nvWu0-PdhzGHFQlAt155pHFvWP3RRCb4Y2Tg8nQ-u7U-9OEivNo4iRho0DeRGC6yH8eF5t3QSvtykF38nEBX_2eWtVOEV7s9h6YLU18sxp1S4BW_vXmw6_xFGuEYw0cVVleop1p82RR6SORPZ-DkXsCp0mPsdGaHDHtz2LyNfPK2dT-w",
  "responseStatus": {}
}
 */
export const login = async (username, password, rememberme) => {
  return (await axios.post('/api/auth/credentials', { username, password, rememberme, useTokenCookie: true })).data
}

/* Sample response:
{
  "responseStatus": {}
}
 */
export const logout = async () => {
  return (await axios.post('/api/auth/logout', {})).data
}

/* Sample response:
{
  "result": {
    "plugins": [
      "ServiceStack.Formats.HtmlFormat",
      "ServiceStack.Formats.CsvFormat",
      "ServiceStack.Formats.MarkdownFormat",
      "ServiceStack.PredefinedRoutesFeature",
      "ServiceStack.MetadataFeature",
      "ServiceStack.NativeTypesFeature",
      "ServiceStack.HttpCacheFeature",
      "ServiceStack.RequestInfoFeature",
      "ServiceStack.AuthFeature",
      "ServiceStack.RegistrationFeature",
      "ServiceStack.CorsFeature",
      "ServiceStack.SessionFeature"
    ],
    "routes": [
      {
        "isWildCardPath": false,
        "variableArgsCount": 0,
        "pathComponentsCount": 2,
        "totalComponentsCount": 2,
        "verbs": [
          "ANY"
        ],
        "requestType": "WebApp.ServerInfoRequest, WebApp",
        "path": "/api/server",
        "allowsAllVerbs": true,
        "priority": 0,
        "isValid": true,
        "firstMatchHashKey": "2/api",
        "uniqueMatchHashKey": "0/System.String[]1/System.String[]"
      },
      ...
    ]
  }
}
 */
export const getServerInfo = async () => {
  return (await axios.get('/api/server')).data
}

export const extractErrorMessage = (err, defaultIfNull) => {
  let message = defaultIfNull
  let responseStatus = null
  if (err && err.responseStatus) responseStatus = err.responseStatus
  else if (err && err.response && err.response.data && err.response.data.responseStatus) responseStatus = err.response.data.responseStatus
  if (responseStatus !== null) {
    if (responseStatus.errors && responseStatus.errors.length > 0) message = responseStatus.errors[0].message
    else message = responseStatus.message
  }
  return message
}
