<template>
  <div class="checkout">
    <div class="upper-section">
      <section class="gig-prev">
        <img :src="imgs[0]" alt="" />
        <span>{{ gig.title }}</span>
      </section>

      <section class="type-package">
        <section class="header">
          <span class="title">{{ package.title }}</span>
          <span class="price">₪{{ package.price }}</span>
        </section>

        <ul class="specials">
          <!-- <section class="benefits"> -->
          <li>
            <i class="v-check" v-html="$getSvg('v-check')"></i
            >{{ package.benefit1 }}
          </li>
          <li>
            <i class="v-check" v-html="$getSvg('v-check')"></i
            >{{ package.benefit2 }}
          </li>
          <!-- </section> -->
          <li v-for="special in package.specials">
            <i class="v-check" v-html="$getSvg('v-check')"></i>
            {{ special }}
          </li>
        </ul>
      </section>
    </div>
    <div class="bottom-section">
      <p class="promo-code">
        Enter promo code <i class="fa-solid fa-circle-question"></i>
      </p>
      <section class="fees">
        <section class="service-fee">
          <p>Service fee <i class="fa-solid fa-circle-question"></i></p>
          <p>$11.73</p>
        </section>
        <section class="vat">
          <p>VAT <i class="fa-solid fa-circle-question"></i></p>
          <p>$8.50</p>
        </section>
      </section>

      <section class="totals">
        <section class="ttl">
          <p class="total">Total</p>
          <p class="t-price">${{ totalPrice() }}</p>
        </section>
        <section class="del-time">
          <p class="delivery-time">
            <font-awesome-icon
              class="ques-icon"
              :icon="['fas', 'circle-question']"
            />
            Total delivery time
          </p>
          <p class="days">3 days</p>
        </section>
      </section>
      <!-- :class="{'cc':paymentMethod === 'cc', 'pp':paymentMethod === 'pp'}" -->
      <section class="confirm">
        <RouterLink
          v-if="paymentMethod === 'cc'"
          class="btn-pay cc"
          @click="addOrder"
          :to="'/user/' + user._id"
        >
          Confirm & Pay
        </RouterLink>
        <RouterLink
          v-else
          class="btn-pay pp"
          @click="addOrder"
          :to="'/user/' + user._id"
        >
          <!-- <i class="paypal-icon" v-html="$getSvg('paypal')"></i>  -->
          <span> PayPal</span> Checkout
        </RouterLink>
      </section>
      <section class="secure">
        <p class="ssl">SSL Secure Payment</p>
        <p class="be-charged">
          You will be charged ${{ totalPrice() }}. Total amount includes
          currency conversion fees
        </p>
      </section>
    </div>
  </div>
</template>

<script>
// import { gigService } from '../services/gig.service';
import { gigService } from "../services/gig.service.local";
// import { userService } from '../services/user.service';
import { userService } from "../services/user.service.local";

export default {
  props: {
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      gig: this.getGigDetails(),
      imgs: [],
      package: {},
      user: userService.getLoggedinUser(),
    };
  },
  methods: {
    async getGigDetails() {
      try {
        const { id } = this.$route.params;
        const gig = await gigService.getById(id);
        this.gig = gig;
        this.imgs = gig.imgUrls;

        const { type } = this.$route.params;
        if (type === "basic") {
          this.package = gig.packages[0];
        } else if (type === "standard") {
          this.package = gig.packages[1];
        } else if (type === "premium") {
          this.package = gig.packages[2];
        }
      } catch (err) {
        console.log(err);
      }
    },
    totalPrice() {
      return this.package.price + 11.73 + 8.5;
    },

    async addOrder() {
      try {
        const loggenInUser = await userService.getLoggedinUser();
        const createdOrder = {
          createdAt: new Date(),
          buyer: {
            _id: loggenInUser._id,
            fullname: loggenInUser.fullname,
            username: loggenInUser.username,
            imgUrl: loggenInUser.imgUrl,
          },
          seller: {
            _id: this.gig.owner._id,
            fullname: this.gig.owner.fullname,
            imgUrl: this.gig.owner.imgUrl,
          },
          gig: {
            _id: this.gig._id,
            name: this.gig.title,
            imgUrls: this.gig.imgUrls,
            price: this.package.price,
          },
          packageType: this.package.level,
          status: "pending",
        };
        await this.$store.dispatch({ type: "addOrder", createdOrder });

        console.log(this.$store.getters.orders);
      } catch (err) {
        console.error(err);
        console.log(err);
      }
    },
  },
};
</script>
