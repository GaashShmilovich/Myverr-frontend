<template>
  <section class="orders-manager-container">
    <div class="item">
      <span>Annual Revenue</span>
      <h3>$30</h3>
    </div>
    <div class="item">
      <span>Monthly Revenue</span>
      <h3>$30</h3>
    </div>
    <div class="item">
      <span>Completed Orders </span>
      <h3>1</h3>
    </div>
    <div class="item">
      <span>Pending Orders </span>
      <h3>0</h3>
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
        <tr v-for="(order, i) in orders" :key="order._id">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ order.buyer }}</td>
          <td>{{ order.gig.name }}</td>
          <td>{{ order.gig.name }}</td>
          <td>${{ order.gig.price }}</td>
          <td>{{ order.status }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  components: {},
  props: { user: Object },
  data() {
    return {};
  },
  computed: {
    orders() {
      return this.$store.getters.orders;
    },
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      try {
        await this.$store.dispatch("loadOrders");
      } catch (err) {
        console.log("Error loading orders:", err);
      }
    },
  },
};
</script>
