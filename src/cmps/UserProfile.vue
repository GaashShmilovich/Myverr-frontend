<template>
  <div class="background-container main-layout full" v-if="loggedinUser?.isSeller">
    <SellerProfile :user="loggedinUser" />

  </div>
  <div class="background-container main-layout full" v-else>
    <BuyerProfile :user="loggedinUser" />
  </div>

  <div class="chat-button-container" @click="showChatRoom = !showChatRoom">
    <div class="avatar"><img :src="findUserOnOtherSide.imgUrl" alt=""></div>
    <div class="content">
      <p>Message {{ userOnOtherSide.fullname }}</p>
      <span v-if="loggedinUser.isSeller">Your costumer</span>
      <span v-else>The owner of your order</span>
      <!-- <span>Available &#183 Avg. response time:
        <span class="time-to-make"> {{ gig?.daysToMake }} Hour</span>
      </span> -->
    </div>
  </div>

  <section class="chat-room">
    <ChatRoom v-if="showChatRoom"         :userOnOtherSide="findUserOnOtherSide"
 :msgHistory="gig?.msgs || []" @toggle-chat-room="toggleChatRoom" />
  </section>
</template>

<script>
import SellerProfile from "./SellerProfile/SellerProfile.vue";
import BuyerProfile from "./BuyerProfile.vue";
import ChatRoom from './ChatRoom.vue'
import { userService } from "../services/user.service.js";
// import { userService } from "../services/user.service.local.js";

export default {
  data() {
    return {
      showChatRoom: false,
      // userOnOtherSide: this.findUserOnOtherSide,
      userOnOtherSide: {},
      userLoggedIn: this.loggedinUser,
    };
  },
  methods: {
    toggleChatRoom() {
      console.log('Toggling chat room...');
      this.showChatRoom = !this.showChatRoom;
    },

    // 
  },
  // created() {
  //   this.user = userService.getLoggedinUser();
  // },
  computed: {
    findUserOnOtherSide() {
      if (this.loggedinUser.isSeller) {
        // console.log(this.loggedinUser);
        // console.log('send buyer');
        this.userOnOtherSide = { _id: '64cd02e1856dea9794a616a4', fullname: 'Oryan', imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1691300650/T04U05NLZ2M-U055TJHS215-337363a46142-512_g7aibi.jpg' }
        return { _id: '64cd02e1856dea9794a616a4', fullname: 'Oryan', imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1691300650/T04U05NLZ2M-U055TJHS215-337363a46142-512_g7aibi.jpg' }
      } else {
        // console.log(this.loggedinUser);
        // console.log('send seller');
        this.userOnOtherSide = { _id: '64cd35578f0ee9ee8c823586', fullname: 'Gaash Shmilovich', imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1691300560/T04U05NLZ2M-U0511SL2JAE-5a79c2b1c487-512_nu9lgh.png', isSeller: true }
        return { _id: '64cd35578f0ee9ee8c823586', fullname: 'Gaash Shmilovich', imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1691300560/T04U05NLZ2M-U0511SL2JAE-5a79c2b1c487-512_nu9lgh.png', isSeller: true }
      }
    },
    loggedinUser() {
      const loggedInUser = this.$store.getters.loggedinUser
      console.log(loggedInUser);
      // this.loggedInUser = loggedInUser
      return loggedInUser
    },
  },
  components: {
    SellerProfile,
    BuyerProfile,
    ChatRoom,
  },
};
</script>
