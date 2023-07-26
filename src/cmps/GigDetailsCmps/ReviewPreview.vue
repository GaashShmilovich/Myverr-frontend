<template lang="">
  <article class="m-1">
  <img :src="review.by.imgUrl" alt="">
  <p> {{ review.by.fullname }}</p>
  <p> {{ review.by.country }}</p>
    <span v-for="i in review.rate || 1">
      <font-awesome-icon
        :style="{ color: '#ffb33e' }"
        icon="fa-solid fa-star"
      /> 
    </span> || <span> {{ review.createdAt }}</span>
    <p> {{ review.txt }}</p>
  </article>
</template>
<script>
export default {
  props: {
    review: Object,
  },
}
</script>
