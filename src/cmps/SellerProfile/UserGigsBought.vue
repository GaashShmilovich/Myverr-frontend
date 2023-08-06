<template>
  <section>
    <h2>hollas</h2>
    <UserOrders
      :orders="ordersToDisplay"
      @remove-order="removeOrder"
      @edit-order="updateOrder"
    ></UserOrders>
  </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
// import { orderService } from "../../services/order.service.local";
import { orderService } from "../../services/order.service";
// import { userService } from "../../services/user.service.local";
import { userService } from "../../services/user.service";
// import OrderPreviewCarousel from "../../cmps/ExploreCmps/OrderPreviewCarousel.vue";
// import {
//   getActionRemoveOrder,
//   getActionUpdateOrder,
//   getActionAddOrderMsg,
// } from "../../store/order.store";
import UserOrders from "./UserOrders.vue";
export default {
  components: {
    // OrderPreviewCarousel,
    UserOrders,
  },
  props: {
    user: Object,
  },
  data() {
    return {
      orderToAdd: orderService.getEmptyOrder(),
    };
  },

  computed: {
    orders() {
      return this.$store.getters.orders;
    },
    ordersToDisplay(){
      const orders = this.$store.getters.orders
      return orders
    },
    filteredOrders() {
      console.log(this.user);
      const orders = this.$store.getters.orders
      console.log(orders);
      if (!this.user.isSeller) {
         orders.filter(
          (order) => order.buyer._id === this.user._id);
          return orders
      } else {
        return orders
      }
    },
  },
  created() {
     this.$store.dispatch("loadOrders",{buyerId:this.user._id});
  },
  // methods: {
  //   async addOrder() {
  //     try {
  //       await this.$store.dispatch({
  //         type: "addOrder",
  //         order: this.orderToAdd,
  //       });
  //       showSuccessMsg("Order added");
  //       this.orderToAdd = orderService.getEmptyOrder();
  //     } catch (err) {
  //       console.log(err);
  //       showErrorMsg("Cannot add order");
  //     }
  //   },
  //   async removeOrder(orderId) {
  //     try {
  //       await this.$store.dispatch(getActionRemoveOrder(orderId));
  //       showSuccessMsg("Order removed");
  //     } catch (err) {
  //       console.log(err);
  //       showErrorMsg("Cannot remove order");
  //     }
  //   },
  //   async updateOrder(order) {
  //     try {
  //       order = { ...order };
  //       order.price = +prompt("New price?", order.price);
  //       await this.$store.dispatch(getActionUpdateOrder(order));
  //       showSuccessMsg("Order updated");
  //     } catch (err) {
  //       console.log(err);
  //       showErrorMsg("Cannot update order");
  //     }
  //   },
  //   async addOrderMsg(orderId) {
  //     try {
  //       await this.$store.dispatch(getActionAddOrderMsg(orderId));
  //       showSuccessMsg("Order msg added");
  //     } catch (err) {
  //       console.log(err);
  //       showErrorMsg("Cannot add order msg");
  //     }
  //   },
  //   printOrderToConsole(order) {
  //     console.log("Order msgs:", order.msgs);
  //   },
  // },
};
</script>
