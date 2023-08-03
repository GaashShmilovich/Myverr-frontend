import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { gigStore } from './gig.store.js'
import { orderStore } from './order.store.js'
import { voiceStore } from './voice.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    gigStore,
    orderStore,
    voiceStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
