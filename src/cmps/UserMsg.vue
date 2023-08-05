<template>
  <div v-show="msg" class="user-msg">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: 'user-msg',
  props: ['msg'],
}
</script>

<style scoped>
.user-msg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  z-index: 100;
  /* border: ; */
}
</style>
