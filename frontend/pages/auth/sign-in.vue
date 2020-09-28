<template>
  <div id="sign-in">
    <h1>Sign In</h1>
    <form autocomplete="off" @submit.prevent="signin">
      <div>
        <div>
          <label>Username</label>
        </div>
        <div>
          <input v-model="username" name="username" type="text" required />
        </div>
      </div>

      <div>
        <div>
          <label>Password</label>
        </div>
        <div>
          <input v-model="password" name="pwd" type="password" required />
        </div>
      </div>

      <div>
        <input
          id="RememberMe"
          v-model="rememberme"
          name="rememberme"
          type="checkbox"
          class="rememberMe"
        />
        <label for="RememberMe">Remember Me</label>
      </div>

      <div v-if="registered" style="color: green">
        <p>Successfully registered, you are ready to login</p>
      </div>

      <div v-if="error" style="color: red">
        <p>{{ error }}</p>
      </div>

      <div><button type="submit">Sign In</button>&nbsp;</div>

      <p>
        Don't have an account yet?
        <nuxt-link :to="signUpUrl">Sign Up!</nuxt-link>
      </p>

      <p style="font-size: smaller">
        <i>(hint: admin/Pa$$w0rd, guest/Pa$$w0rd)</i>
      </p>
    </form>
  </div>
</template>

<script>
import { extractErrorMessage } from '~/utils/api'

export default {
  middleware: 'anonymous',
  data() {
    return {
      username: null,
      password: null,
      rememberme: false,
      error: null,
    }
  },
  computed: {
    redirect() {
      return this.$route.query.redirect
        ? decodeURIComponent(this.$route.query.redirect)
        : '/'
    },
    registered() {
      return (this.$route.query.registered || '') === 'true'
    },
    signUpUrl() {
      return (
        '/auth/sign-up?' + (this.redirect ? `redirect=${this.redirect}` : '')
      )
    },
  },
  methods: {
    async signin(event) {
      this.error = null
      try {
        await this.$auth.logout()
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
            rememberme: this.rememberme,
            usetokencookie: true,
          },
        })
        const redirectUrl =
          this.redirect.length === 0 || this.redirect.substr(0, 1) !== '/'
            ? '/' + this.redirect
            : this.redirect
        this.$router.push(redirectUrl)
      } catch (err) {
        this.error = extractErrorMessage(
          err,
          'There was an error, unable to sign in with those credentials.'
        )
      }
    },
  },
}
</script>

<style scoped lang="scss">
#sign-in {
  width: 100%;
  text-align: center;

  a {
    cursor: pointer;
  }
  input[type='checkbox'] {
    margin-right: 10px;
  }
  div {
    margin-bottom: 10px;
  }
}
</style>
