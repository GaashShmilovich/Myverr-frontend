import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Chat from './views/Chat.vue'
import GigIndex from './views/explore/GigIndex.vue'
import ReviewIndex from './views/ReviewIndex.vue'
import LoginSignup from './views/LoginSignup.vue'
import UserDetails from './views/UserDetails.vue'
import gigDetails from './views/GigDetails/GigDetails.vue'

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
    component: gigDetails
  },
  {
    path: '/review',
    name: 'ReviewIndex',
    component: ReviewIndex
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
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: UserDetails
  }
]

export const router = createRouter({
	routes,
	history: createWebHashHistory(),
	// base: process.env.BASE_URL,
})
