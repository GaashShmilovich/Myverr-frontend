<template>
  <section class="seller-reviews">
    <ul v-for="gig in filteredGigs" :key="gig._id" class="gig-list-reviews">
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
    return {};
  },
  components: {},
  props: {
    user: Object,
  },
  methods: {},
  created() {},
  computed: {
    gigs() {
      return this.$store.getters.gigs;
    },
    filteredGigs() {
      try {
        return this.$store.getters.gigs.filter(
          (gig) => gig.owner._id === this.user._id
        );
      } catch (err) {
        console.error(err);
        console.log(err);
      }
    },
  },
};
</script>
