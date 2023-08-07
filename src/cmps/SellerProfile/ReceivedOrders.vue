<template>
  <section class="orders-manager-container">
    <div class="item">
      <span>Annual Revenue</span>
      <h3>${{ annualRevenue }}</h3>
    </div>
    <div class="item">
      <span>Monthly Revenue</span>
      <h3>${{ monthlyRevenue }}</h3>
    </div>
    <div class="item">
      <span>Completed Orders </span>
      <h3>{{ completedOrdersCount }}</h3>
    </div>
    <div class="item">
      <span>Pending Orders </span>
      <h3>{{ pendingOrdersCount }}</h3>
    </div>
  </section>
  <section class="table-container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Buyer</th>
          <th>Gig</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, i) in orders"
          :key="order._id"
          @click="openModal(order)"
        >
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ order.buyer.username }}</td>
          <td>{{ order.gig.title }}</td>
          <td>{{ order.status }}</td>
        </tr>
      </tbody>
    </table>
  </section>
  <CustomModal
    v-if="modalVisible"
    :order="selectedOrder"
    @close="modalVisible = false"
  />
</template>

<script>
import CustomModal from "./CustomModal.vue";
import moment from "moment";

export default {
  components: { CustomModal },
  props: { user: Object },
  data() {
    return { modalVisible: false, selectedOrder: null };
  },
  computed: {
    monthlyRevenue() {
      const currentMonth = moment().format("MMMM");
      return this.orders.reduce((total, order) => {
        const orderMonth = moment(order.createdAt).format("MMMM");
        if (orderMonth === currentMonth) {
          return total + order.gig.price;
        }
        return total;
      }, 0);
    },
    annualRevenue() {
      const currentYear = moment().format("YYYY");
      return this.orders.reduce((total, order) => {
        const orderYear = moment(order.createdAt).format("YYYY");
        if (orderYear === currentYear) {
          return total + order.gig.price;
        }
        return total;
      }, 0);
    },
    pendingOrdersCount() {
      return this.orders.filter((order) => order.status === "pending").length;
    },
    completedOrdersCount() {
      return this.orders.filter((order) => order.status === "completed").length;
    },
    orders() {
      const orders = this.$store.getters.orders;
      return orders;
    },
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      try {
        await this.$store.dispatch({ type: "loadOrders" });
      } catch (err) {
        console.log("Error loading orders:", err);
      }
    },
    openModal(order) {
      console.log("Clicked on order:", order);

      this.selectedOrder = order;
      this.modalVisible = true;
    },
    async onStatusChange(status) {
      try {
        const payload = {
          order: this.selectedOrder,
          status: status,
        };
        console.log(payload);
        await this.$store.dispatch({ type: "updateOrder", payload });
        // this.$store.commit("updateOrderStatus", {
      } catch (err) {
        console.log("Error updating order status:", err);
      }
    },
  },
};
</script>
