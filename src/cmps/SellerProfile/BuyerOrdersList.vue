<template>
  <section>
    <!-- <h2>hollas</h2> -->
    <BuyerOrders :orders="orders"></BuyerOrders>
  </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
// import { orderService } from "../../services/order.service.local";
import { orderService } from "../../services/order.service";
// import { userService } from "../../services/user.service.local";
import { userService } from "../../services/user.service";

import BuyerOrders from "./BuyerOrders.vue";
export default {
  components: {
    // OrderPreviewCarousel,
    BuyerOrders,
  },
  props: {
    user: Object,
  },
  data() {
    return {};
  },

  computed: {
    orders() {
      // console.log(orders.length);
      return this.$store.getters.orders;
    },

    filteredOrders() {
      console.log(this.user);
      const orders = this.$store.getters.orders;
      console.log(orders);
      if (!this.user.isSeller) {
        orders.filter((order) => order.buyer._id === this.user._id);
        return orders;
      } else {
        return orders;
      }
    },
  },
  created() {
    this.$store.dispatch("loadOrders", { buyerId: this.user._id });
  },
};
</script>
