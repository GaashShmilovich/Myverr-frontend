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
          <th>Order date</th>
          <th>Total</th>
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
          <td>{{ order.buyer.fullname }}</td>
          <td>{{ order.gig.title }}</td>
          <td>{{ order.createdAt }}</td>
          <td>${{ order.gig.price }}</td>
          <td>{{ order.status }}</td>
        </tr>
      </tbody>
    </table>
  </section>
  <CustomModal
    :show="modalVisible"
    :order="selectedOrder"
    @close="modalVisible = false"
    @change-status="onStatusChange"
  />
</template>

<script>
import CustomModal from "./CustomModal.vue";
export default {
  components: { CustomModal },
  props: { user: Object },
  data() {
    return { modalVisible: false, selectedOrder: null };
  },
  computed: {
    orders() {
      return this.$store.getters.orders;
    },
    monthlyRevenue() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      return this.orders.reduce((total, order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate.getMonth() === currentMonth) {
          return total + order.gig.price;
        }
        return total;
      }, 0);
    },
    annualRevenue() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      return this.orders.reduce((total, order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate.getFullYear() === currentYear) {
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
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      try {
        await this.$store.dispatch("loadOrders");
        console.log(this.orders);
      } catch (err) {
        console.log("Error loading orders:", err);
      }
    },
    openModal(order) {
      this.selectedOrder = order;
      console.log("order", order);
      this.modalVisible = true;
    },
    onStatusChange(status) {
      try {
        this.$store.commit("updateOrderStatus", {
          orderId: this.selectedOrder._id,
          newStatus: status,
        });
      } catch (err) {
        console.log("Error updating order status:", err);
      }
    },
  },
};
</script>
