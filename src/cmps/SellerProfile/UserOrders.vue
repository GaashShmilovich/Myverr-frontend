<template>
  <div>
    <ul class="order-list">
      <li v-for="order in orders" :key="order._id">
        <div class="order-card">
          <div class="order-seller">{{ order?.seller.username }}</div>
          <div class="order-title">{{ order?.gig.title }}</div>
          <div class="order-price">{{ order?.status }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    orders: Array,
  },
  methods: {},
};
</script>
