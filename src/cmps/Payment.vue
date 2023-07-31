<template>
  <div class="payment">

    <div class="payment-section">
      <section class="billing-info">
        <p class="title">Billing information</p>
        <p class="txt">Your invoice will be issued according to the details listed here.</p>
        <p><span class="name">{{ user.username }}</span>
        <p class="country">{{ user.country }}</p>
        </p>
        <button>Add details</button>
      </section>

      <section class="payment-info">
        <p class="title">Payment Options</p>
        <div>
          <input @click="choosePayment('credit')" type="radio" id="credit" class="credit" name="payment" value="credit"
            checked>
          <label for="credit">
            Credit & Debit Cards <i class="home-icon" v-html="$getSvg('credit-cards')"></i>
          </label>

          <section class="credit-details" :class="{ 'hidden': paymentMethod === 'paypal' }">

            <section class="card-number">
              <p>Card number</p>
              <input type="text" v-model="cardNumber" />
            </section>
            <section class="expiration-date">
              <p>Expiration date</p>
              <input type="text" v-model="expiryDate" />
            </section>
            <section class="cvv">
              <p>Security code</p>
              <input type="text" v-model="cvv" />
            </section>
            <section class="first-name">
              <p>First name</p>
              <input type="text" v-model="firstName" />
            </section>
            <section class="last-name">
              <p>Last name</p>
              <input type="text" v-model="lastName" />
            </section>

          </section>
        </div>


        <div>
          <input @click="choosePayment('paypal')" type="radio" id="paypal" class="paypal" name="payment" value="paypal">
          <label for="paypal">
            <i class="home-icon" v-html="$getSvg('paypal')"></i>
          </label>
        </div>
      </section>

    </div>

    <div class="checkout-section">
      <Checkout />
    </div>


    <!-- <RouterLink v-if="user" :to="'/user/' + user._id">Process Payment</RouterLink> -->
    <!-- <RouterLink v-else="!user" to='/'>Process Payment</RouterLink> -->
  </div>
</template>

<script>
import Checkout from './Checkout.vue'
import { userService } from '../services/user.service.local';
import { gigService } from '../services/gig.service.local';
export default {
  data() {
    return {
      cardNumber: '1234-5678-8765-4321',
      expiryDate: '08/08',
      cvv: '777',
      firstName: 'John',
      lastName: 'Brown',
      user: userService.getLoggedinUser(),
      paymentMethod: null,
    };
  },
  methods: {
    choosePayment(method) {
      this.paymentMethod = method
      console.log(this.paymentMethod);
    }
  },
  components: {
    Checkout,
  },
  created() {
    // const  gigId  = this.$route.params
    // console.log(gigId);
    // try{
    //   const gig = gigService.getById(gigId)
    //   console.log(gig);
    // } catch(err) {
    //   console.log(err);
    // }
  },
};
</script>