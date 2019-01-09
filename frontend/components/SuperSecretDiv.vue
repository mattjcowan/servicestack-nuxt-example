<template>
  <div :class="{ admin: (identifier === 'admin') }">This is a secret div for {{ identifier }} users!</div>
</template>

<script>
export default {
  props: {
    identifier: { type: String, default: 'anonymous' }
  }
}
</script>

<style lang="scss" scoped>
div {
  background-color: #ecf0f1;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 2px;
  padding: 10px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  text-align: center;
  font-size: 40px;
  font-weight: 100;
  margin-bottom: 30px;

  .admin {
    background-color: #222;
    color: #fff;
  }
}
</style>
