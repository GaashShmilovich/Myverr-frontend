<template>
  <section class="dashboard-container">
    <div class="background"></div>

    <div class="user-profile">
      <div class="user-info">
        <h1>{{ user.fullname }}</h1>
        <h3>{{ user.country }}</h3>
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
        <RouterLink :to="userGigsLink">My gigs</RouterLink>
        <RouterLink :to="loggedInUser._id + '/gigs'">My orders</RouterLink>
        <RouterLink :to="loggedInUser._id + '/gigs'"
          >Received orders</RouterLink
        >
        <RouterLink :to="loggedInUser._id + '/gigs'">Reviews</RouterLink>
      </div>
      <div class="main-gigs">
        <RouterView :user="user" />
      </div>
    </div>
  </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { gigService } from "../../services/gig.service.local";
import { userService } from "../../services/user.service.local";
import {
  getActionRemoveGig,
  getActionUpdateGig,
  getActionAddGigMsg,
} from "../../store/gig.store";

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      gigToAdd: gigService.getEmptyGig(),
      // user: null,
    };
  },
  computed: {
    userGigsLink() {
      return `/user/${this.user._id}/gigs`;
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
    async addGig() {
      try {
        await this.$store.dispatch({ type: "addGig", gig: this.gigToAdd });
        showSuccessMsg("Gig added");
        this.gigToAdd = gigService.getEmptyGig();
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add gig");
      }
    },
    async removeGig(gigId) {
      try {
        await this.$store.dispatch(getActionRemoveGig(gigId));
        showSuccessMsg("Gig removed");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot remove gig");
      }
    },
    async updateGig(gig) {
      try {
        gig = { ...gig };
        gig.price = +prompt("New price?", gig.price);
        await this.$store.dispatch(getActionUpdateGig(gig));
        showSuccessMsg("Gig updated");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot update gig");
      }
    },
    async addGigMsg(gigId) {
      try {
        await this.$store.dispatch(getActionAddGigMsg(gigId));
        showSuccessMsg("Gig msg added");
      } catch (err) {
        console.log(err);
        showErrorMsg("Cannot add gig msg");
      }
    },
    printGigToConsole(gig) {
      console.log("Gig msgs:", gig.msgs);
    },
  },
};
</script>
