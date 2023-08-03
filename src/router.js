import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Chat from './views/Chat.vue'
import GigIndex from './views/GigIndex.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
// import UserDetails from './views/UserDetails.vue'
import UserProfile from '../src/cmps/UserProfile.vue'
import GigDetails from './views/GigDetails.vue'
import GigEdit from './views/GigEdit.vue'
import Payment from '../src/cmps/Payment.vue'
import MyGigs from '../src/cmps/SellerProfile/MyGigs.vue'
import UserOrders from '../src/cmps/SellerProfile/UserOrders.vue'

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
    path: '/user/:gigId?/edit',
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
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  // {
  //   path: '/user/:id',
  //   name: 'UserDetails',
  //   component: UserDetails
  // },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: UserProfile,
    children: [
      {
        path: 'gigs',
        name: 'MyGigs',
        component: MyGigs
      },
      {
        path: '/orders',
        name: 'UserOrders',
        component: UserOrders
      },
      // {
      //   path: '/receivedOrders',
      //   name: 'UserSettings',
      //   component: ReceivedOrders
      // },
      // {
      //   path: '/reviews',
      //   name: 'UserSettings',
      //   component: reviews
      // },
    ]
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
