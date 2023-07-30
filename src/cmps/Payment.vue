<template>
    <div class="checkout">
      <h2>Checkout Payment</h2>
      <div class="form-group">
        <label for="cardNumber">Card Number</label>
        <input type="text" id="cardNumber" v-model="cardNumber" />
      </div>
      <div class="form-group">
        <label for="expiryDate">Expiry Date</label>
        <input type="text" id="expiryDate" v-model="expiryDate" />
      </div>
      <div class="form-group">
        <label for="cvv">CVV</label>
        <input type="text" id="cvv" v-model="cvv" />
      </div>
      <RouterLink :to="'/user/' + user._id" >Process Payment</RouterLink>
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
      user: userService.getLoggedinUser()
    };
  },
  components: {
  },
};
</script>