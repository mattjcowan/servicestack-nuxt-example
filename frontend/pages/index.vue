<template>
  <div>
    <super-secret-div v-if="isAuthenticated" identifier="authenticated" />
    <div class="content">
      <h1>Hello, {{ userDisplayName }}!</h1>
      <p>
        This is a super simple example of how to use
        <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt.js</a>
        and
        <a hrf="https://servicestack.net" target="_blank">ServiceStack</a>
        together.
      </p>
      <p v-if="!isAuthenticated">
        You're not authenticated yet. Maybe you want to
        <nuxt-link to="/auth/sign-in" class="link">sign in</nuxt-link> and see
        what happens?
      </p>
      <p v-else>
        Now that you're authenticated, maybe you should try going to our
        <nuxt-link to="/secret" class="link">top secret page</nuxt-link>!
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SuperSecretDiv from '~/components/SuperSecretDiv'
import types from '~/utils/types'

export default {
  components: {
    SuperSecretDiv,
  },
  computed: {
    ...mapGetters([types.getters.isAuthenticated, types.getters.getUser]),
    userDisplayName() {
      const user = this.getUser
      return user && user.displayName ? user.displayName : 'friend'
    },
  },
}
</script>

<style scoped>
.content {
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
}
</style>
