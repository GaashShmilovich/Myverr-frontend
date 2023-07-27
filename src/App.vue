<template>
  <section class="main-layout">
    <AppHeader />
    <RouterView />
  </section>
</template>

<script>
import { userService } from "./services/user.service.local";
import { store } from "./store/store";

import AppHeader from "./cmps/HeaderCmps/AppHeader.vue";

export default {
  created() {
    console.log("Vue App created");
    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });
  },
  components: {
    AppHeader,
  },
};
</script>
