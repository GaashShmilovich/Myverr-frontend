<template>
  <div class="payment">

    <div class="payment-section">
      <section class="billing-info">
        <p class="title">Billing information</p>
        <p class="txt">Your invoice will be issued according to the details listed here.</p>
        <p><span class="name">{{ user.username }}</span>
        <p class="country">{{ user.country }}</p>
        </p>
      </section>

      <section class="payment-info">
        <p class="title">Payment Options</p>
        <div>
          
          <section class="credit custom-radio">
            <input @click="choosePayment('cc')" type="radio" id="credit" 
            name="payment" class="payment" value="credit" checked>
            <label for="credit" class="custom-radio-btn"></label>
            <!-- <span class="custom-radio-btn" for="credit"></span> -->

           <span >
            Credit & Debit Cards <i class="cc-icon" v-html="$getSvg('credit-cards')"></i>
          </span>
        </section>

          <section class="credit-details" :class="{ 'hidden': paymentMethod === 'pp' }">

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
            <input @click="choosePayment('pp')" type="radio" id="paypal" 
            name="payment" class="paypal" value="paypal">
            <label class="custom-radio-btn" for="paypal"></label>
          <span >
            <i class="paypal-icon" v-html="$getSvg('paypal')"></i>
          </span>
        </section>
      </section>
      
    </div>
    
    <div class="checkout-section">
      <Checkout :paymentMethod="paymentMethod" />
    </div>
    
  </div>

  <p class="payment-footer full">Payments are processed by Myverr International Ltd., Myverr Limited, and Myverr Inc. See
    <span>Payment Terms</span>
  </p >
</template>

<script>
import Checkout from './Checkout.vue'
// import { userService } from '../services/user.service.local';
import { userService } from '../services/user.service';
// import { gigService } from '../services/gig.service.local';
import { gigService } from '../services/gig.service';
export default {
  data() {
    return {
      cardNumber: '1234-5678-8765-4321',
      expiryDate: '08/08',
      cvv: '777',
      firstName: 'John',
      lastName: 'Brown',
      user: userService.getLoggedinUser(),
      paymentMethod: 'cc',
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