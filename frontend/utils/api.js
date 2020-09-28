let axios

export function setClient(axiosClient) {
  axios = axiosClient
}

export const register = async (
  username,
  firstname,
  lastname,
  displayname,
  email,
  password
) => {
  return (
    await axios.post('/api/auth/register', {
      username,
      firstname,
      lastname,
      displayname,
      email,
      password,
      autologin: false,
    })
  ).data
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
  else if (
    err &&
    err.response &&
    err.response.data &&
    err.response.data.responseStatus
  )
    responseStatus = err.response.data.responseStatus
  if (responseStatus !== null) {
    if (responseStatus.errors && responseStatus.errors.length > 0)
      message = responseStatus.errors[0].message
    else message = responseStatus.message
  }
  return message
}
