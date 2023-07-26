<template lang="">
    <section class="review-list">
      <h2>Reviews</h2>
      <ul class="clean-list">
        <li
          v-for="review in reviews"
          class="review-container flex justify-between items-center"
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
  