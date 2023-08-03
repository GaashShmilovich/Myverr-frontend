<template>
  <div v-if="user.isSeller">
    <SellerProfile :user="user" />
  </div>
  <div v-else>
    <BuyerProfile :user="user" />
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
      user: null,
      // loggedInUser: null,
    };
  },
  created() {
    this.user = userService.getLoggedinUser();
  },
  computed: {
    // loggedInUser() {
    // console.log(this.$store.getters.loggedInUser);
    // return this.$store.getters.loggedInUser;
    // },
  },
  components: {
    SellerProfile,
    BuyerProfile,
  },
};
</script>
