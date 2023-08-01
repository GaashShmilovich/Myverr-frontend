<template>
  <h1>User Profile</h1>
  <div v-if="user.isSeller">
    <SellerProfile :user="loggedInUser" />
  </div>
  <div v-else>
    <BuyerProfile :user="loggedInUser" />
  </div>
</template>

<script>
import SellerProfile from "./SellerProfile.vue";
import BuyerProfile from "./BuyerProfile.vue";
import { userService } from "../services/user.service.local.js";

export default {
  data() {
    return {
      user: null,
      loggedInUser: null,
    };
  },
  computed: {
    loggedInUser() {
      console.log(this.$store.getters.loggedInUser);
      return this.$store.getters.loggedInUser;
    },
  },
  components: {
    SellerProfile,
    BuyerProfile,
  },
};
</script>
