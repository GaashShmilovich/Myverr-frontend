<template>
  <div
    class="background-container main-layout full"
    v-if="loggedinUser?.isSeller"
  >
    <SellerProfile :user="loggedinUser" />
    
  </div>
  <div class="background-container main-layout full" v-else>
    <BuyerProfile :user="loggedinUser" />
  </div>

  <div class="chat-button-container" @click="showChatRoom = !showChatRoom">
    <div class="avatar"><img :src="gig?.owner.imgUrl" alt=""></div>
    <div class="content">
      <p>Message {{ gig?.owner.fullname }}</p>
      <span>Available &#183 Avg. response time:
        <span class="time-to-make"> {{ gig?.daysToMake }} Hour</span>
      </span>
    </div>
  </div>
  
  <section class="chat-room">
  <ChatRoom
        v-if="showChatRoom"
        :othersideUser="findUserOnOtherSide()"
        :msgHistory="gig?.msgs || []"
        @toggle-chat-room="toggleChatRoom"
      />
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
      userOnOtherSide: this.findUserOnOtherSide,
      // user: null,
      userLoggedIn: this.loggedinUser,
    };
  },
  methods: {
    toggleChatRoom() {
      console.log('Toggling chat room...');

    this.showChatRoom = !this.showChatRoom;
  },
  findUserOnOtherSide() {
    // if(this.loggedinUser.isSeller) console.log('isSeller');
    if(this.loggedinUser.isSeller) {
      console.log(this.loggedinUser);
      console.log('send buyer');
      return {id: '64cd0e6d856dea9794a616a5'}
    } else {
       console.log(this.loggedinUser);
     console.log('send seller');
     return {id: '64cd35578f0ee9ee8c823586'}
     }
  }
  },
  // created() {
  //   this.user = userService.getLoggedinUser();
  // },
  computed: {
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
