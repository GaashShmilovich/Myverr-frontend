<template>
  <section class="seller-reviews">
    <ul v-for="gig in gigs" :key="gig.id" class="gig-list-reviews">
      <li v-for="review in gig.reviews" :key="review.id" class="review-item">
        <div class="reviewer-info">
          <img class="reviewer-img" :src="review.by.imgUrl" alt="" />
          <div class="reviewer-details">
            <p class="fullname">{{ review.by.fullname }}</p>
            <p class="country">{{ review.by.country.name }}</p>
          </div>
        </div>
        <p class="review-text">{{ review.txt }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      gigs: null,
      // reviews: this.gig.reviews
    };
  },
  components: {},
  props: {
    user: Object,
  },
  methods: {},
  created() {
    try {
      console.log("user._id", this.user._id);
      console.log("user.id", this.user.id);
      this.gigs = this.$store.getters.gigs.filter(
        (gig) => gig.owner._id === this.user.id
      );
      console.log(this.gigs);
    } catch (err) {
      console.error(err);
      console.log(err);
    }
  },
};
</script>
