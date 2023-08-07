<template>
  <div class="modal-overlay">
    <div class="modal-status">
      <h2>Change Order Status</h2>
      <div class="modal-buttons">
        <button
          class="status-button complete"
          @click="changeStatus('completed')"
        >
          Complete
        </button>
        <button class="status-button reject" @click="changeStatus('reject')">
          Reject
        </button>
        <button class="status-button cancel" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { orderService } from "../../services/order.service";

export default {
  props: {
    order: Object,
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },

    async changeStatus(status) {
      const order = this.order;
      await this.$store.dispatch("changeOrderStatus", { order, status });
      console.log(order);

      const orders = this.$store.getters.orders;
      console.log(orders);
      const updatedOrder = orders.find((o) => o._id === order._id);

      this.closeModal();
    },
  },
};
</script>
