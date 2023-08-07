<template>
  <section class="main-layout">
    <AppHeader />
    <RouterView />
    <UserMsg :msg="orderupdateMsg" />
    <AppFooter />
  </section>
</template>

<script>
// import { userService } from './services/user.service.local'
import { userService } from "./services/user.service";
import { store } from "./store/store";

import AppHeader from "./cmps/HeaderCmps/AppHeader.vue";
import UserMsg from "./cmps/UserMsg.vue";
import AppFooter from "./cmps/AppFooter.vue";

export default {
  data() {
    return {
      orderupdateMsg: ''
    }
  },
  created() {
    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });
  },
  mounted() {
    // this.$store.dispatch({ type: 'loadGigs' })
    socketService.on('order-update', this.setOrderUpdateMsg)
    // socketService.on('order-for-you', this.setOrderUpdateMsg)

  },
  methods: {
    setOrderUpdateMsg(msg) {
      this.orderupdateMsg = msg
      setTimeout(() => {
        this.orderupdateMsg = ''
      }, 3000)
    },
  },
  unmounted() {
    socketService.off('order-update', this.setOrderUpdateMsg)
  },
  components: {
    AppHeader,
    UserMsg,
    AppFooter,
  },
};
</script>
