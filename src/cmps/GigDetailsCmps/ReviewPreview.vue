<template lang="">
  <article class="m-1">
    <span v-for="i in review.rate || 1">
      <font-awesome-icon
        :style="{ color: '#f8cc2d' }"
        icon="fa-solid fa-star"
      />
    </span>
    <!-- <p>{{ review.byUser.fullname }}</p>
    <p>{{ review.content }}</p> -->
    <pre> {{ review }}</pre>
  </article>
</template>
<script>
export default {
  props: {
    review: Object,
  },
}
</script>
