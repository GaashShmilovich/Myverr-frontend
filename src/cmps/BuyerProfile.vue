<template>
    <section class="dashboard-container">
      <div class="background"></div>
  
      <div class="user-profile">
        <div class="user-info">
          <h1>{{ user.fullname }}</h1>
          <h3>{{ user.country }}</h3>
          <img :src="user.imgUrl" alt="" />
          <button @click="doLogout">Logout</button>
        </div>
  
        <div class="user-description">
          <header class="desc-header">
            <h1>Ready to earn on your own terms?</h1>
          </header>
          <div class="desc-content">
            <button>Become a Seller</button>
            <!-- <RouterLink>Become a Seller</RouterLink> -->
          </div>
        </div>
      </div>
      <div class="seller-section">
        <div class="tabs">
          
          <RouterLink
            @click="setActiveTab"
            :class="{ active: activeTab }"
            :to="userOrdersLink"
            >Orders</RouterLink
          >
        </div>
        <div class="main-gigs">
          <RouterView :user="user" />
          <!-- <UserOrders :user="user" /> -->
        </div>
      </div>
    </section>
  </template>
  
  <script>
  // import { Router zxbcsyf7e534Link, RouterView } from "vue-router";
  import { gigService } from "../services/gig.service";
  // import { gigService } from "../services/gig.service.local";
  // import UserOrders from "../cmps/SellerProfile/UserOrders.vue"
  
  export default {
    props: {
      user: Object,
    },
    data() {
      return {
        // gigToAdd: gigService.getEmptyGig(),
        // activeTab: 0,
      };
    },
    computed: {
      // userGigsLink() {
      //   return `/user/${this.user._id}/gigs`;
      // },
      userOrdersLink() {
        return `/user/${this.user._id}/orders`;
      },
      loggedInUser() {
        return this.$store.getters.loggedinUser;
      },
      
    methods: {
      getOrders() {
        return this.$store.getters.orders.filter(
          (order) => order.buyer._id === this.user._id
        )
      },
      doLogout() {
        this.$store.dispatch({ type: "logout" });
      },
     
     
    },
    components: {
      // UserOrders,
    }
  }
}
  
  </script>
  