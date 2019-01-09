// middleware to ensure user is authenticated, otherwise redirect the user to a sign-in page
// and attach the current route path as a query string parameter so that the user can be
// redirected back after login

export default function ({ store, redirect, route }) {
  if (!store.state.auth.loggedIn) {
    return redirect('/auth/sign-in?redirect=' + route.path)
  }
}
