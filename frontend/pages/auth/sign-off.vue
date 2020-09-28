<template>
  <p>Signing off...</p>
</template>

<script>
export default {
  async mounted() {
    await this.$auth.logout()
    this.$router.push('/')
  },
}
</script>
