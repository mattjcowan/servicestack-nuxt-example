<template>
  <div class="app">
    <fork-this/>
    <div class="main">
      <navbar/>
      <nuxt/>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import ForkThis from '~/components/ForkThis'
import { getUserFromLocalCache } from '~/utils/auth'
import types from '~/utils/types'

export default {
  components: {
    Navbar,
    ForkThis
  },
  mounted() {
    const user = getUserFromLocalCache()
    if (user) this.$store.dispatch(types.actions.setUser, user)
  }
}
</script>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
}
.main {
  max-width: 1024px;
  margin: 0 auto;
  padding: 30px;
}
</style>
