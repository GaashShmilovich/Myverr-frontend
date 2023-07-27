<template>
  <section v-if="gigToEdit" class="gig-edit">
    <form class="gig-edit_form" @submit.prevent="saveGig">
      <div class="gig-edit_title-container">
        <label for="txt" class="gig-edit__label">Gig Name</label>
        <el-input
          v-model="gigToEdit.title"
          id="txt"
          type="text"
          placeholder="Enter your gig name here..."
        />
      </div>
      <div class="gig-edit__input-box">
        <label for="txt" class="gig-edit__label">Description</label>
        <el-input
          v-model="gigToEdit.description"
          id="txt"
          type="text"
          placeholder="Enter your gig description here..."
        />
      </div>
      <div>
        <button class="btn">save</button>
        <button class="btn-dark" @click="goBack">go back</button>
      </div>
    </form>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.local";

export default {
  name: "GigEdit",
  data() {
    return {
      gigToEdit: null,
      selectedLabels: [],
    };
  },
  created() {
    // if (!this.user || !this.user.isAdmin) this.$router.push("/explore");

    const { gigId } = this.$route.params;
    if (gigId) {
      gigService.getById(gigId).then((gig) => {
        this.gigToEdit = gig;
        // this.selectedLabels = gig.labels.map((label) => label.title);
      });
    } else this.gigToEdit = gigService.getEmptyGig();
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    saveGig() {
      // const newLabels = this.labels.filter((label) =>
      //   this.selectedLabels.includes(label.title)
      // );
      // this.gigToEdit.labels = newLabels;
      this.$store
        .dispatch({ type: "updateGig", gig: this.gigToEdit })
        .then(() => {
          this.$router.push("/explore");
        });
    },
  },
  computed: {
    labels() {
      return this.$store.getters.labels;
    },
    user() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>
