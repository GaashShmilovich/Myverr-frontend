<template>
  <section class="main-container">
    <AppHeader />
    <RouterView />
    <!-- <AppFooter /> -->
    <UserMsg />
  </section>
</template>

<script>
import { userService } from "./services/user.service";
import { store } from "./store/store";

import AppHeader from "./cmps/HeaderCmps/AppHeader.vue";
import UserMsg from "./cmps/UserMsg.vue";

export default {
  created() {
    console.log("Vue App created");
    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });
  },
  components: {
    AppHeader,
    // AppFooter,
    UserMsg,
  },
};
</script>
