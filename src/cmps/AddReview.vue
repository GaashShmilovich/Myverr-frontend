<template>
  <section class="review-form-container">
    <form @submit.prevent="submitReview">
      <div>
        <label for="message">Your review:</label>
        <RateByStars @input="inputRate" />
        <textarea id="message" v-model="txt" required></textarea>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  </section>
</template>

<script>
import { userService } from "../services/user.service";
import { utilService } from "../services/util.service";
import RateByStars from "./RateByStars.vue";

export default {
  data() {
    return {
      txt: "",
      rate: "",
      user: userService.getLoggedinUser(),
    };
  },
  methods: {
    inputRate(rating) {
      console.log(rating);
      this.rate = rating;
    },
    submitReview() {
      const review = {
        id: utilService.makeId(),
        txt: this.txt,
        rate: this.rate,
        createdAt: "Just now",
        by: {
          _id: this.user._id,
          fullname: this.user.fullname,
          imgUrl: this.user.imgUrl,
          country: {
            name: this.user.country,
            img: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png",
          },
        },
      };
      this.$emit("addReview", review);
    },
  },
  components: {
    RateByStars,
  },
};
</script>
