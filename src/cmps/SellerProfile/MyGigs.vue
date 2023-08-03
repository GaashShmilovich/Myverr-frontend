<template>
  <section>
    <GigListSeller
      :gigs="filteredGigs"
      @remove-gig="removeGig"
      @edit-gig="updateGig"
    ></GigListSeller>
  </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { gigService } from "../../services/gig.service.local";
import { userService } from "../../services/user.service.local";
import GigPreviewCarousel from "../../cmps/ExploreCmps/GigPreviewCarousel.vue";
import {
  getActionRemoveGig,
  getActionUpdateGig,
  getActionAddGigMsg,
} from "../../store/gig.store";
import GigListSeller from "../SellerProfile/GigListSeller.vue";
export default {
  components: {
    GigPreviewCarousel,
    GigListSeller,
  },
  props: {
    user: Object,
  },
  data() {
    return {
      gigToAdd: gigService.getEmptyGig(),
    };
  },

  computed: {
    gigs() {
      return this.$store.getters.gigs;
    },
    filteredGigs() {
      return this.$store.getters.gigs.filter(
        (gig) => gig.owner._id === this.user.id
      );
    },
  },
  created() {
    this.$store.dispatch({
      type: "loadGigs",
    });
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
