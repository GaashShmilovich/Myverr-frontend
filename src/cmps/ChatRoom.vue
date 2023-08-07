<template>
  <div class="chat-room-container">
    <div class="seller-info-container">
      <button class="close-chat-button" @click="toggleChatRoom">X</button>
      <div class="seller-info">
        <div class="avatar"><img :src="userOnOtherSide.imgUrl" alt="" /></div>
        <div class="content">
          <p>Message {{ userOnOtherSide.fullname }}</p>
          <span>Available &#183 Avg. response time: 1 hour
          </span>
        </div>
      </div>
    </div>
    <h3 v-if="typingUser">{{ typingUser }} is typing...</h3>
    <div class="chat-list">
      <p v-for="(msg, idx) in msgs" :key="idx" class="chat-msg">
        {{ msg.fullname }}: {{ msg.txt }}
      </p>
    </div>
    <div class="send-box flex">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="msgTxt"
        @input="onType"
        @keyup.enter="sendMsg"
        placeholder="Write your message"
        class="custom-textarea"
      ></textarea>
      <button @click="sendMsg" class="btn">
        <i class="send" v-html="$getSvg('send-msg')"></i>
        <p>Send message</p>
      </button>
    </div>
  </div>
  
</template>

<script>
import {
  socketService,
  SOCKET_EMIT_SET_TOPIC,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EVENT_ADD_MSG,
  SOCKET_EVENT_USER_IS_TYPING,
  SOCKET_EMIT_USER_IS_TYPING,
} from "../services/socket.service.js";
import { utilService } from "../../src/services/util.service.js";
import { userService } from "../services/user.service";

export default {
  name: "chat-room",
  props: {
    // gigId: String,
    msgHistory: Array,
    userOnOtherSide: Object,
    othersideUser: Object
  },
  data() {
    return {
      msgTxt: "",
      msgs: [...this.msgHistory],
      typingUser: "",
      socketType: 'room1',
      otherUser: this.GetOtherUser
    };
  },
  created() {
    console.log('chat rendered');
    // socketService.emit(SOCKET_EMIT_SET_TOPIC, this.gigId);
    socketService.emit(SOCKET_EMIT_SET_TOPIC, this.socketType);
    socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg);
    socketService.on(SOCKET_EVENT_USER_IS_TYPING, (fullname) => {
      this.typingUser = fullname;
    });
    
  },
  computed: {
    user() {
      console.log(this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    GetOtherUser() {
      const user = userService.getById(this.othersideUser.id)
      console.log(user);
      return user
    },
    toggleChatRoom() {
      this.$emit("toggle-chat-room");
    },
    addMsg(msg) {
      this.msgs.push(msg);
    },
    sendMsg() {
      const msg = {
        txt: this.msgTxt,
        fullname: this.user?.fullname || "Guest",
      };
      this.addMsg(msg);
      socketService.emit(SOCKET_EMIT_SEND_MSG, msg);
      this.msgTxt = "";
    },
    onType() {
      this.setTyping();
      this.clearTyping();
    },
    setTyping() {
      socketService.emit(
        SOCKET_EMIT_USER_IS_TYPING,
        this.user?.fullname || "Guest"
      );
    },
    clearTyping: utilService.debounce(() => {
      socketService.emit(SOCKET_EMIT_USER_IS_TYPING, "");
    }),
  },

  unmounted() {
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg);
    socketService.off(SOCKET_EVENT_USER_IS_TYPING);
    // socketService.terminate()
  },
};
</script>
