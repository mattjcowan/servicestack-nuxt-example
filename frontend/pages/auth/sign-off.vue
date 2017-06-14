<template>
  <p>Signing off...</p>
</template>

<script>
import { unsetToken } from '~/utils/auth'
import { logout } from '~/utils/api'

export default {
  async mounted () {
    await logout()
    unsetToken()
    this.$router.push('/')
  }
}
</script>
