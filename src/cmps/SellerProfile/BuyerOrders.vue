<template>
  <section class="table-container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Seller</th>
          <th>title</th>
          <th></th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, i) in orders" :key="order._id">
          <th scope="row">{{ i + 1 }}</th>
          <td class="buyer">
            <div class="buyer-content">
              <img
                class="user-image"
                :src="getOrderSellerImage(order)"
                alt="Buyer Image"
              />
              <span class="username">{{ order?.seller.username }}</span>
            </div>
          </td>
          <td v-if="order?.gig?.title">{{ order?.gig.title }}</td>
          <td class="gig-imgs">
            <div class="gig-images-container">
              <img
                v-for="(imageUrl, index) in getOrderGigImages(order)"
                :key="imageUrl"
                :src="imageUrl"
                alt="Gig Image"
                :class="getGigImageClass(index)"
              />
            </div>
          </td>
          <td>{{ order?.status }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { userService } from "../../services/user.service";
export default {
  components: {},
  props: {
    orders: Array,
  },
  data() {
    return {
      users: [],
    };
  },
  async created() {
    try {
      this.users = await userService.getUsers();
    } catch (error) {
      console.error("Error loading users:", error);
    }
  },
  computed: {
    gigs() {
      return this.$store.getters.gigs;
    },
  },
  methods: {
    getGigImageClass(index) {
      return `gig-image-${index}`;
    },

    getOrderSellerImage(order) {
      if (order && order.seller) {
        const seller = this.users.find((user) => user._id === order.seller._id);
        if (seller) {
          return seller.imgUrl;
        }
      }
      return "";
    },
    getOrderGigImages(order) {
      const gigImages = [];
      if (order && order.gig && order.seller) {
        const gig = this.gigs.find((gig) => gig._id === order.gig._id);
        if (gig && gig.owner._id === order.seller._id) {
          gigImages.push(...gig.imgUrls.slice(0, 3)); // Push at most 3 imgUrls to the array
        }
      }
      return gigImages;
    },
  },
};

/* <div>
  <ul class="order-list">
    <li v-for="order in orders" :key="order._id">
      <div class="order-card">
        <div class="order-seller">From: {{ order?.seller.username }}</div>
         <div class="order-title">{{ order?.gig.title }}</div>
        <div class="order-price">Status: {{ order?.status }}</div>
      </div>
    </li>
  </ul>
</div> */
</script>
