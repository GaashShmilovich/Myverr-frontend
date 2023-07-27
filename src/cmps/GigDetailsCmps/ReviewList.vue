<template lang="">
    <section class="">
      <h2>Reviews</h2> 
      <h3>{{ reviews?.length }} reviews for this Gig
        <span v-for="i in reviews.rate || 1"> 
          <!-- // how to make average of review rates? -->
      <font-awesome-icon
        :style="{ color: '#ffb33e' }"
        icon="fa-solid fa-star"
      />
    </span>
      </h3>

      <form @submit.prevent="searchReview">
      <input type="text" placeholder="Search reviews" v-model="searchTxt">
      <button class="fa-regular fa-magnifying-glass">search</button>
      </form>

      <ul class="review-list">
        <li
          v-for="review in filteredReviews"
          class="reviews-list"
          :key="review._id"
        >
          <ReviewPreview :review="review" />
        </li>
      </ul>
    </section>
  </template>
<script>
import ReviewPreview from './ReviewPreview.vue'
export default {
  props: {
    reviews: Array,
  },
  data() {
    return {
      searchTxt: '',
      filteredReviews: []
    }
  },
  async created() {
    console.log(this.reviews);
    this.filteredReviews = this.reviews
  },
  components: {
    ReviewPreview,
  },
  methods: {
    searchReview() {
      console.log(this.searchTxt);
      const regex = new RegExp(this.searchTxt, 'i')
      this.filteredReviews = this.reviews.filter(review => 
      regex.test(review.txt) ||
      regex.test(review.by.fullname) ||
      regex.test(review.by.country) ||
      regex.test(review.rate))
      this.searchTxt = ''
    }
  },
}
</script>
<style lang=""></style>
  