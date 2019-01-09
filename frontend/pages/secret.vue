<template>
  <div 
    v-if="getUser" 
    class="content">
    <super-secret-div 
      v-if="isAdmin" 
      identifier="admin"/>
    <img :src="getUser.picture">
    <p>Hi {{ getUser.name }}!</p>
    <p>This is a super secure page! Try loading this page again using the incognito/private mode of your browser.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SuperSecretDiv from '~/components/SuperSecretDiv'
import types from '~/utils/types'

export default {
  middleware: 'authenticated',
  components: {
    SuperSecretDiv
  },
  computed: {
    ...mapGetters([types.getters.getUser]),
    isAdmin () {
      return (this[types.getters.getUser].roles || []).indexOf('Admin') > -1
    },
    picture () {
      const user = this[types.getters.getUser]
      return user && user.meta ? user.meta.picture : null
    }
  }
}
</script>

<style scoped>
.content {
  text-align: center;
  padding-top: 20px;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin: 15px 0;
}
</style>
