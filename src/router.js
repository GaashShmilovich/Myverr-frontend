import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Chat from './views/Chat.vue'
import GigIndex from './views/GigIndex.vue'
import LoginSignup from './views/LoginSignup.vue'
// import UserDetails from './views/UserDetails.vue'
import UserProfile from '../src/cmps/UserProfile.vue'
import GigDetails from './views/GigDetails.vue'
import GigEdit from './views/GigEdit.vue'
import Payment from '../src/cmps/Payment.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'GigIndex',
    component: GigIndex
  },
  {
    path: '/explore/:gigId',
    name: 'GigDetails',
    component: GigDetails
  },
  {
    path: '/explore/edit/:gigId?',
    name: 'GigEdit',
    component: GigEdit
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'LoginSignup',
    component: LoginSignup
  },
  // {
  //   path: '/user/:id',
  //   name: 'UserDetails',
  //   component: UserDetails
  // },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/payment/:id/:type',
    name: 'Payment',
    component: Payment
  }
]

export const router = createRouter({
	routes,
	history: createWebHashHistory(),
	// base: process.env.BASE_URL,
})
