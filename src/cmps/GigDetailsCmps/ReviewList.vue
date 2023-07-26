<template lang="">
    <section class="reviews">
      <h2>Reviews</h2> 
      <h3>{{ reviews?.length }} reviews for this Gig</h3>
      <!-- <input type="text" v-model="review.txt" placeholder="Search reviews"> -->

      <ul class="clean-list">
        <li
          v-for="review in reviews"
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
    components: {
      ReviewPreview,
    },
    methods: {
    },
  }
  </script>
  <style lang=""></style>
  