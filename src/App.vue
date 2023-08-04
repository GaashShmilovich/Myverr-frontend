<template>
  <section class="main-layout">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </section>
</template>

<script>
// import { userService } from './services/user.service.local'
import { userService } from "./services/user.service";
import { store } from "./store/store";

import AppHeader from "./cmps/HeaderCmps/AppHeader.vue";
import AppFooter from "./cmps/AppFooter.vue";

export default {
  created() {
    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });
  },
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
