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
  async created() {
    try {
      const { gigId } = this.$route.params;
      if (gigId) {
        const gig = await gigService.getById(gigId);
        this.gigToEdit = gig;
      } else {
        this.gigToEdit = gigService.getEmptyGig();
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    async saveGig() {
      try {
        await this.$store.dispatch({ type: "updateGig", gig: this.gigToEdit });

        this.$router.push("/explore");
      } catch (error) {
        console.error("Error occurred:", error);
      }
    },
    computed: {
      labels() {
        return this.$store.getters.labels;
      },
      user() {
        return this.$store.getters.loggedInUser;
      },
    },
  },
};
</script>
