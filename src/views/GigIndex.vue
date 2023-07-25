<template>
  <div class="container home">
    <ul class="gig-list">
      <li v-for="gig in gigs" :key="gig._id">
        <p>
          {{ gig.vendor }}
        </p>
        <p>${{ gig.price?.toLocaleString() }}</p>
        <button @click="removeGig(gig._id)">x</button>
        <button @click="updateGig(gig)">Update</button>
        <hr />
        <button @click="addGigMsg(gig._id)">Add gig msg</button>
        <button @click="printGigToConsole(gig)">Print msgs to console</button>
      </li>
    </ul>
    <hr />
    <form @submit.prevent="addGig()">
      <h2>Add gig</h2>
      <input type="text" v-model="gigToAdd.vendor" />
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { gigService } from "../services/gig.service.local";
import {
  getActionRemoveGig,
  getActionUpdateGig,
  getActionAddGigMsg,
} from "../store/gig.store";
export default {
  data() {
    return {
      gigToAdd: gigService.getEmptyGig(),
    };
  },
  computed: {
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
