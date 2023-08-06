<template>
  <section class="dashboard-container">
    <div class="user-profile">
      <div class="user-info">
        <img :src="user.imgUrl" alt="" />
        <h1>{{ user.fullname }}</h1>
        <div class="country">
          <span><i class="search" v-html="$getSvg('place')"> </i> Country</span>
          {{ user.country }}
        </div>
        <div class="sub-type">
          <span
            ><i class="search" v-html="$getSvg('member')"> </i>
            Subscription</span
          >
          {{ user.level }}
        </div>
      </div>

      <div class="user-description">
        <header class="desc-header">
          <h1>Description</h1>
        </header>
        <div class="desc-content">
          <p>
            Hi there! I'm a creative graphic designer with a passion for
            bringing ideas to life. I specialize in logo design, branding, and
            social media graphics. Let's work together to make your brand stand
            out from the crowd!
          </p>
        </div>
      </div>
    </div>
    <div class="seller-section">
      <div class="tabs">
        <RouterLink :class="{ active: activeTab }" :to="userOrdersLink"
          >My orders</RouterLink
        >
      </div>
      <div class="main-gigs">
        <RouterView :user="user" />
      </div>
    </div>

    
  </section>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { gigService } from "../services/gig.service";

// import { gigService } from "../services/gig.service.local";

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      gigToAdd: gigService.getEmptyGig(),
      activeTab: 0,

    };
  },
  computed: {
    userOrdersLink() {
      return `/user/${this.user._id}/buyerOrders`;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    gigs() {
      return this.$store.getters.gigs;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadGigs" });
  },

  methods: {
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push(`/explore`);
    },

    printGigToConsole(gig) {
      console.log("Gig msgs:", gig.msgs);
    },
    
  },
  components: { RouterView, RouterLink }
};
</script>
