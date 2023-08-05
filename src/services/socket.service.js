import io from 'socket.io-client'
import { userService } from './user.service'

export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'
// export const SOCKET_EVENT_ADD_MSGS = 'chat-add-msgs'
export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'
export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic'
export const SOCKET_EMIT_USER_WATCH = 'user-watch'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
export const SOCKET_EVENT_ORDER_ADDED = 'order-added'
export const SOCKET_EVENT_ORDER_FOR_YOU = 'order-for-you'
export const SOCKET_EVENT_ORDER_UPDATED = 'order-updated'
export const SOCKET_EVENT_YOUR_ORDER_UPDATED = 'your-order-updated'
export const SOCKET_EVENT_USER_IS_TYPING = 'chat-user-is-typing'
export const SOCKET_EMIT_USER_IS_TYPING = 'chat-set-user-is-typing'
// export const SOCKET_EVENT_SET_USERS = 'chat-set-users'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

// render url?
const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()


function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(()=>{
        const user = userService.getLoggedinUser()
        if (user){
         console.log(user);
          this.login(user._id)
        }  
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      data = JSON.parse(JSON.stringify(data))
      socket.emit(eventName, data)
    },
    login(userId) {
      console.log(userId);
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    login() {   
    },
    logout() {   
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      var listeners = listenersMap[eventName]
      // This is dummy socket behavior
      // When someone send-msg, we notify add-msg subscribers
      if (eventName === SOCKET_EMIT_SEND_MSG) {
        listeners = listenersMap[SOCKET_EVENT_ADD_MSG]
      }

      if (!listeners) return

      listeners.forEach(listener => {
        listener(data)
      })
    },
    // Functions for easy testing of pushed data
    testChatMsg() {
      this.emit(SOCKET_EVENT_ADD_MSG, { from: 'Someone', txt: 'Aha it worked!' })
    },
    testUserUpdate() {
      this.emit(SOCKET_EVENT_USER_UPDATED, {...userService.getLoggedinUser(), score: 555})
    },
  }
  window.listenersMap = listenersMap
  return socketService
}


// Basic Tests
// function cb(x) {console.log('Socket Test - Expected Puk, Actual:', x)}
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('mama', cb)
// socketService.emit('baba', 'Puk')
// socketService.off('baba', cb)
