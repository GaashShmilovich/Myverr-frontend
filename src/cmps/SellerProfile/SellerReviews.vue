<template>
  <section class="seller-reviews">
    <h1>hi</h1>
    <!-- <pre>{{ user }}</pre> -->
    <!-- <pre>{{ reviews }}</pre> -->
    <ul v-for="gig in gigs">
      <li v-for="review in gig.reviews"> 
      <section class="review-by">
        <img class="reviewer-img" :src="review.by.imgUrl" alt="">
        <p>{{ review.by.fullname }}</p>
        <p class="country-img">{{ review.rate }}</p>
        <p class="country-name">{{ review.by.country.name }}</p>
        <img :src="review.by.country.img" alt="">
      </section>
      <section>
        <p class="txt">{{ review.txt }}</p>
        <!-- <p>Created {{ review.cr }}</p> -->
      </section>
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
    }
  },
  components: {},
  props: {
    user: Object
  },
  methods: {},
  created() {
    try {
      console.log('user._id', this.user._id);
      console.log('user.id',this.user.id);
      this.gigs = this.$store.getters.gigs.filter(
        (gig) => gig.owner._id === this.user.id
      );
      console.log(this.gigs);
    } catch(err) {
      console.error(err)
      console.log(err);
    }
  }
};
</script>
