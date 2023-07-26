<template lang="">
    <section class="">
      <h2>Reviews</h2> 
      <h3>{{ reviews?.length }} reviews for this Gig
        <span v-for="i in reviews.rate || 1"> // how to make average of review rates?
      <font-awesome-icon
        :style="{ color: '#ffb33e' }"
        icon="fa-solid fa-star"
      />
    </span>
      </h3>
      <!-- <input type="text" v-model="review.txt" placeholder="Search reviews"> -->

      <ul class="review-list">
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
  