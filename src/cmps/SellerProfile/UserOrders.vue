<template>
  <div>
    <ul class="order-list">
      <li v-for="order in orders" :key="order._id">
        <pre>{{ order }}</pre>
        <!-- <OrderPreview :order="order" @delete="removeOrder" @edit="editOrder"></OrderPreview> -->
      </li>
    </ul>
  </div>
</template>

<script>
// import OrderPreview from "./OrderPreviewSeller.vue";

export default {
  components: {
    // OrderPreview,
  },
  props: {
    orders: Array,
  },
  methods: {
    removeOrder(order) {
      this.$emit("remove-order", order);
    },
    editOrder(order) {
      this.$emit("edit-order", order);
    },
  },
};
</script>
