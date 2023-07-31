<template>
  <div class="payment">

    <section class="billing-info">
      <p>Billing information</p>
      <p>Your invoice will be issued according to the details listed here.</p>
      <p>{{ user.username }}</p>
      <p>{{ user.country }}</p>
      <button>Add details</button>
    </section>

    <section class="payment-info">
      <p>Payment Options</p>
      <div>
        <input @click="choosePayment('credit')" type="radio" id="credit" class="credit" name="payment" value="credit" checked>
        <label for="credit">
          Credit & Debit Cards
        </label>
        <section class="credit-details hidden" :class="{'show' : paymentMethod === 'credit'}" >

        <section class="card-number" >
      <span>Card number</span>
      <input type="text" v-model="cardNumber" />
       </section>
    <section class="expiration-date">
      <span >Expiration date</span>
      <input type="text" v-model="expiryDate" />
    </section>
    <section class="cvv">
      <span>Security code</span>
      <input type="text" v-model="cvv" />
    </section>
    <section class="first-name">
      <span>First name</span>
      <input type="text" v-model="firstName" />
    </section>
    <section class="last-name">
      <span>Last name</span>
      <input type="text" v-model="lastName" />
    </section>

  </section>
      </div>


      <div>
        <input @click="choosePayment('paypal')" type="radio" id="paypal" class="paypal" name="payment" value="paypal">
        <label for="paypal">
          paypal
        </label>
      </div>
    </section>



    
    <RouterLink v-if="user" :to="'/user/' + user._id">Process Payment</RouterLink>
    <RouterLink v-else="!user" to='/'>Process Payment</RouterLink>
  </div>
</template>

<script>

import { userService } from '../services/user.service';
export default {
  data() {
    return {
      cardNumber: '1234-5678-8765-4321',
      expiryDate: '08/08',
      cvv: '777',
      firstName: '',
      lastName: '',
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
};
</script>