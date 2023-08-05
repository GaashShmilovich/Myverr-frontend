<template>
  <div
    class="background-container main-layout full"
    v-if="loggedinUser?.isSeller"
  >
    <SellerProfile :user="loggedinUser" />
  </div>
  <div class="background-container main-layout full" v-else>
    <BuyerProfile :user="loggedinUser" />
  </div>
</template>

<script>
import SellerProfile from "./SellerProfile/SellerProfile.vue";
import BuyerProfile from "./BuyerProfile.vue";
import { userService } from "../services/user.service.js";
// import { userService } from "../services/user.service.local.js";

export default {
  data() {
    return {
      // user: null,
      // loggedInUser: null,
    };
  },
  // created() {
  //   this.user = userService.getLoggedinUser();
  // },
  computed: {
    loggedinUser() {
      console.log(this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser;
    },
  },
  components: {
    SellerProfile,
    BuyerProfile,
  },
};
</script>
