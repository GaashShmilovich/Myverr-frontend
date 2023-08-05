<template>
  <div class="chat-room-container">
    <h2>Chat</h2>
    <h3 v-if="typingUser">{{ typingUser }} is typing...</h3>
    <div class="chat-list">
      <p v-for="(msg, idx) in msgs" :key="idx" class="chat-msg">
        {{ msg.fullname }}: {{ msg.txt }}
      </p>
    </div>
    <div class="send-box flex">
      <input v-model="msgTxt" @input="onType" type="text" placeholder="Write your message" />
      <button @click="sendMsg" class="btn">Send</button>
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
} from '../services/socket.service.js'
import { utilService } from '../../src/services/util.service.js'

export default {
  name: 'chat-room',
  props: {
    gigId: String,
    msgHistory: Array,
  },
  data() {
    return {
      msgTxt: '',
      msgs: [...this.msgHistory],
      typingUser: '',
    }
  },
  created() {
    socketService.emit(SOCKET_EMIT_SET_TOPIC, this.gigId)
    socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
    socketService.on(SOCKET_EVENT_USER_IS_TYPING, fullname => {
      this.typingUser = fullname
    })
  },
  computed: {
    user() {
      console.log(this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
    },
    sendMsg() {
      const msg = {
        txt: this.msgTxt,
        fullname: this.user?.fullname || 'Guest',
      }
      this.addMsg(msg)
      socketService.emit(SOCKET_EMIT_SEND_MSG, msg)
      this.msgTxt = ''
    },
    onType() {
      this.setTyping()
      this.clearTyping()
    },
    setTyping() {
      socketService.emit(SOCKET_EMIT_USER_IS_TYPING, this.user?.fullname || 'Guest')
    },
    clearTyping: utilService.debounce(() => {
      socketService.emit(SOCKET_EMIT_USER_IS_TYPING, '')
    }),
  },

  unmounted() {
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
    socketService.off(SOCKET_EVENT_USER_IS_TYPING)
    // socketService.terminate()
  },
}
</script>

<style lang="scss">
.chat-room-container {
  position: fixed;
  bottom: 4px;
  left: 4px;
  background-color: rgb(144 238 144 / 93%);
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 2px 1px #0000002a, -2px -2px 1px 1px #00000011;

  .chat-list {
    min-height: 250px;
  }

  .chat-msg:nth-child(even) {
    background-color: #e1e1e18f;
  }

  .send-box {
    height: 35px;
  }

  .close-btn {
    position: absolute;
    right: 8px;
    top: 8px;
    font-weight: 700;
    cursor: pointer;
  }
}
</style>
