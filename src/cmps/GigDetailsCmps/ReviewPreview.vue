<template lang="">
  <section class="review-preview" >
    <section class="review-by">
  <img :src="review.by.imgUrl" alt="">
      <section class="review-by-name">
  <p> {{ review.by.fullname }}</p>
  <p> {{ review.by.country }}</p>
      </section>
    </section>
    <section class="review-rate-time">
    <span v-for="i in review.rate || 1">
      <font-awesome-icon
        :style="{ color: '#ffb33e' }"
        icon="fa-solid fa-star"
      /> 
    </span> || <span> {{ review.createdAt }}</span>
    </section>
    <p> {{ review.txt }}</p>
  </section>
</template>
<script>
export default {
  props: {
    review: Object,
  },
}
</script>
