<template>
  <section v-if="gigToEdit" class="gig-edit">
    <form class="gig-edit_form" @submit.prevent="saveGig">
      <div class="gig-edit_title-container">
        <label for="txt" class="gig-edit_title"
          ><span
            >Gig title
            <p>
              As your Gig storefront, your title is the most important place to
              include keywords that buyers would likely use to search for a
              service like yours.
            </p></span
          >
          <el-input
            v-model="gigToEdit.title"
            id="txt"
            type="text"
            placeholder="Enter your gig title here..."
          />
        </label>
      </div>
      <div class="gig-edit__input-box">
        <label for="txt" class="gig-edit_description"
          ><span>Description</span>
          <el-input
            v-model="gigToEdit.description"
            id="txt"
            type="textarea"
            :rows="8"
            placeholder="Enter your gig description here..."
          />
        </label>
      </div>
      <div>
        <button class="btn">save</button>
        <button class="btn-dark" @click="goBack">go back</button>
      </div>
    </form>
  </section>
</template>

<script>
// import { gigService } from "../services/gig.service";
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
  computed: {
    labels() {
      return this.$store.getters.labels;
    },
    user() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    goBack() {
      this.$router.push(`/user/${this.user._id}/gigs`);
    },
    async saveGig() {
      try {
        await this.$store.dispatch({
          type: "updateGig",
          gig: this.gigToEdit,
        });

        this.$router.push(`/user/${this.user._id}/gigs`);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    },
  },
};
</script>
