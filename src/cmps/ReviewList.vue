<template lang="">
    <section class="reviews">
      <p class="title">Reviews</p> 

      <p class="sub-title">{{ reviews?.length }} reviews for this Gig
        <span v-for="i in reviews.rate || 1"> 
          <!-- // how to make average of review rates? -->
      <font-awesome-icon
        :style="{ color: '#ffb33e' }"
        icon="fa-solid fa-star"
      />
    </span>
  </p>

      <ReviewRateBar />

      <form class="search-form" @submit.prevent="searchReview">
    <input type="text" class="input" placeholder="Search reviews" v-model="searchTxt" />
    <button type="submit" ><i class="search-icon" v-html="$getSvg('search-icon')"></i></button>
      </form>

      <section class="sort">
        <p>Sort By <span>Rate</span></p>
      </section>

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
import ReviewRateBar from './ReviewRateBar.vue'
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
    ReviewRateBar,
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
    }
  },
}
</script>
<style lang=""></style>
  