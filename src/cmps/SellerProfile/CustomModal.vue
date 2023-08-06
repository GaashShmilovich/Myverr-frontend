<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-status">
      <h2>Change Order Status</h2>
      <div class="modal-buttons">
        <button class="complete" @click="changeStatus('complete')">
          Complete
        </button>
        <button class="reject" @click="changeStatus('reject')">Reject</button>
        <button class="cancel" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { orderService } from '../../services/order.service'
export default {
  props: {
    show: Boolean,
    order: Object,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async changeStatus(status) {
      const order = this.order
      await this.$store.dispatch('changeOrderStatus', {order, status})
      console.log(order);

      const orders = this.$store.getters.orders
      console.log(orders);
      const updatedOrder = orders.find((o) => o._id === order._id)
      // console.log(updatedOrder);
      // this.$store.commit('updateOrder', {newOrder: updatedOrder})
      // orderService.save({order: updatedOrder})

      this.closeModal();
    },
  },
};
</script>
