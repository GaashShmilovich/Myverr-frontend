<template>
  <section v-if="gigToEdit && labels" class="gig-edit flex">
    <form class="gig-edit__form grid" @submit.prevent="saveGig">
      <div class="gig-edit__input-box">
        <label for="txt" class="gig-edit__label">Gig Name</label>
        <el-input
          v-model="gigToEdit.title"
          id="txt"
          type="text"
          placeholder="Enter your gig name here..."
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
    if (!this.user || !this.user.isAdmin) this.$router.push("/explore");

    const { gigId } = this.$route.params;
    if (gigId) {
      gigService.getById(gigId).then((gig) => {
        this.gigToEdit = gig;
        this.selectedLabels = gig.labels.map((label) => label.title);
      });
    } else this.gigToEdit = gigService.getEmptyGig();
  },
  methods: {
    goBack() {
      this.$router.push("/explore");
    },
    saveGig() {
      const newLabels = this.labels.filter((label) =>
        this.selectedLabels.includes(label.title)
      );
      this.gigToEdit.labels = newLabels;
      this.$store
        .dispatch({ type: "saveGig", gig: this.gigToEdit })
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
