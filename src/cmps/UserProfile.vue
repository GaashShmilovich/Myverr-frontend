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
        :owner="gig?.owner"
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

      // user: null,
      // loggedInUser: null,
    };
  },
  methods: {
    toggleChatRoom() {
      console.log('Toggling chat room...');

    this.showChatRoom = !this.showChatRoom;
  },
  },
  // created() {
  //   this.user = userService.getLoggedinUser();
  // },
  computed: {
    loggedinUser() {
      console.log(this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser;
    },
  },
  components: {
    SellerProfile,
    BuyerProfile,
    ChatRoom,
  },
};
</script>
