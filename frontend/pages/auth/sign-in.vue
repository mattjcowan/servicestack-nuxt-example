<template>
  <div id="sign-in">

    <h1>Sign In</h1>
    <form autocomplete="off" v-on:submit="signin">

      <div>
        <div>
          <label>Username</label>
        </div>
        <div>
          <input name="username" type="text" v-model="username" required>
        </div>
      </div>

      <div>
        <div>
          <label>Password</label>
        </div>
        <div>
          <input name="pwd" type="password" v-model="password" required>
        </div>
      </div>

      <div>
        <input id="RememberMe" name="rememberme" type="checkbox" class="rememberMe" v-model="rememberme" />
        <label for="RememberMe">Remember Me</label>
      </div>

      <div v-if="registered" style="color: green;">
        <p>Successfully registered, you are ready to login</p>
      </div>

      <div v-if="error" style="color: red;">
        <p>{{error}}</p>
      </div>

      <div >
        <button type="submit">Sign In</button>&nbsp;
      </div>

      <p>Don't have an account yet? <nuxt-link v-bind:to="signUpUrl">Sign Up!</nuxt-link></p>

      <p style="font-size:smaller;"><i>(hint: admin/Pa$$w0rd, guest/Pa$$w0rd)</i></p>
    </form>
  </div>
</template>

<script>
import { unsetToken, setToken, setRefreshToken, getQueryParams } from '~/utils/auth'
import { logout, login, extractErrorMessage } from '~/utils/api'

export default {
  middleware: 'anonymous',
  mounted () {
    const { redirect, registered } = getQueryParams()
    this.registered = registered === 'true'
    this.redirect = decodeURIComponent(redirect || '/')
  },
  data () {
    return {
      registered: false,
      redirect: null,
      username: null,
      password: null,
      rememberme: false,
      error: null
    }
  },
  computed: {
    signUpUrl () {
      return '/auth/sign-up?redirect=' + this.redirect
    }
  },
  methods: {
    async signin (event) {
      event.preventDefault()
      this.registered = false
      this.error = null
      try {
        await logout()
        unsetToken()
        const response = await login(this.username, this.password, this.rememberme)
        setToken(response.bearerToken)
        setRefreshToken(response.refreshToken)
        if (this.redirect.length === 0 || this.redirect.substr(0, 1) !== '/') {
          this.redirect = '/' + this.redirect
        }
        this.$router.push(this.redirect)
      } catch (err) {
        this.error = extractErrorMessage(err, 'There was an error, unable to sign in with those credentials.')
      }
    }
  }
}
</script>

<style scoped lang="scss">
#sign-in {
  width: 100%;
  text-align: center;

  a { cursor: pointer; }
  input[type='checkbox'] { margin-right: 10px; }
  div {
    margin-bottom: 10px;
  }
}
</style>
