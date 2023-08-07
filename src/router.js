import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Chat from './views/Chat.vue'
import GigIndex from './views/GigIndex.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import UserProfile from '../src/cmps/UserProfile.vue'
import GigDetails from './views/GigDetails.vue'
import GigEdit from './views/GigEdit.vue'
import Payment from '../src/cmps/Payment.vue'
import MyGigs from '../src/cmps/SellerProfile/MyGigs.vue'
import ReceivedOrders from '../src/cmps/SellerProfile/ReceivedOrders.vue'
import SellerReviews from '../src/cmps/SellerProfile/SellerReviews.vue'
import BuyerOrdersList from '../src/cmps/SellerProfile/BuyerOrdersList.vue'

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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
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
        path: 'orders',
        name: 'ReceivedOrders',
        component: ReceivedOrders
      },
      {
        path: 'buyerOrders',
        name: 'BuyerOrdersList',
        component: BuyerOrdersList
      },

      {
        path: 'reviews',
        name: 'SellerReviews',
        component: SellerReviews
      },
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
