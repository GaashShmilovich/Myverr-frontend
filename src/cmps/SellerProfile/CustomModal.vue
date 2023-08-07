<template>
  <div class="modal-overlay">
    <div class="modal-status">
      <h2>
        Change Order Status
        <button class="status-button cancel" @click="closeModal">
          &#10005;
        </button>
      </h2>

      <div class="modal-buttons">
        <button
          class="status-button complete"
          @click="changeStatus('completed')"
        >
          Complete
        </button>
        <button
          class="status-button accept"
          @click="changeStatus('In progress')"
        >
          Accept
        </button>
        <button class="status-button reject" @click="changeStatus('reject')">
          Reject
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { orderService } from "../../services/order.service";
import { socketService } from "../../services/socket.service";

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
      const updatedOrder = await this.$store.dispatch("changeOrderStatus", {
        order,
        status,
      });
      console.log(order);

      console.log(updatedOrder);
      // const orders = this.$store.getters.orders;

      this.closeModal();
    },
  },
};
</script>
