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
          
          <section class="credit custom-radio">
            <input @click="choosePayment('credit')" type="radio" id="credit" 
            name="payment" class="payment" value="credit" checked>
            <label for="credit" class="custom-radio-btn"></label>
            <!-- <span class="custom-radio-btn" for="credit"></span> -->

           <span >
            Credit & Debit Cards <i class="cc-icon" v-html="$getSvg('credit-cards')"></i>
          </span>
        </section>

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


        
          <section class="paypal custom-radio">
            <input @click="choosePayment('paypal')" type="radio" id="paypal" 
            name="payment" class="paypal" value="paypal">
            <label class="custom-radio-btn" for="paypal"></label>
          <span >
            <i class="paypal-icon" v-html="$getSvg('paypal')"></i>
          </span>
        </section>
        
      </section>

    </div>

    <div class="checkout-section">
      <Checkout :user="user" />
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
    },
  },
  components: {
    Checkout,
  },
  
};
</script>