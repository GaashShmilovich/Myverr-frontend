<template>
  <div class="chat-room-container">
    <h3 v-if="typingUser">{{ typingUser }} is typing...</h3>
    <button class="close-chat-button" @click="toggleChatRoom">X</button>
    <div class="chat-list">
      <h2>Chat</h2>
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
        placeholder="Write your message"
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

export default {
  name: "chat-room",
  props: {
    gigId: String,
    msgHistory: Array,
  },
  data() {
    return {
      msgTxt: "",
      msgs: [...this.msgHistory],
      typingUser: "",
    };
  },
  created() {
    socketService.emit(SOCKET_EMIT_SET_TOPIC, this.gigId);
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
