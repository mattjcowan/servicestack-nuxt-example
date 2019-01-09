// this plugin exists just to show how to work with the @nuxtjs/auth module

export default function ({ app }) {
  if (!app.$auth.loggedIn) {
    return
  }
  const user = app.$auth.user
  /*
  {
    id: 1,
    userName: 'admin',
    displayName: 'Administrator',
    fullName: 'Administrator',
    roles: [
      'Admin'
    ],
    permissions: [],
    createdDate: '2019-01-08T21:52:17.6449480-06:00',
    modifiedDate: '2019-01-08T21:52:17.6449480-06:00',
    invalidLoginAttempts: 0,
    meta: {
      picture: '/images/avatar1-bw.png'
    }
  }
  */
  // console.log(app.$auth.user)
}
