import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { gigStore } from './gig.store.js'
import { reviewStore } from './review.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    gigStore,
    reviewStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
