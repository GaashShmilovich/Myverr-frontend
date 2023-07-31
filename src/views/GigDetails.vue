<template>
  

  <section v-if="gig" class="gig-details" :class="{ darkmode: darkMode }">
    <!-- <div class="main"> -->

      <button class="gig-btn-dark" @click="onDarkMode">Dark Mode</button>
      <header class="gig-header">
      <p class="gig-category">  
        <i class="home-icon" v-html="$getSvg('home-icon')"></i> <span>/</span><p>logo-design</p>
        <span>/</span><p>artisitic</p><span>/</span>
      </p>

      <h1 class="gig-title"> {{ gig.title }}</h1>

      <section class="gig-owner-details">
        <img :src="gig.owner.imgUrl" alt="">
        <span class="name">{{ gig.owner.fullname }}</span>
        <span class="instagram">{{ gig.owner.instagram }}</span>
        <span class="level">{{ gig.owner.level }} |</span>

        <section class="gig-owner-rate">
          <span v-for="i in gig.owner.rate || 1">
            <font-awesome-icon class="star yellow" icon="fa-solid fa-star" />
          </span>
        </section>

        <p class="rate-number" :style="{ color: '#ffb33e' }">{{ gig.owner.rate }} <span>(592)</span></p>
      </section>

      <figure class="gig-gallery">
        <GigDetailsCarusela :gig="gig" />
      </figure>
    </header>
    <div class="gig-about">
      <p class="about-title">About this gig </p>
      <div class="about"> {{ gig.description }}</div>

      <p class="title">About the seller</p>
      <AboutSeller :gig="gig"/>
      
        <FAQ :gig="gig" />

      <ReviewList :reviews="gig.reviews" />
    </div>
  <!-- </div> -->

    <div class="packages" >
      <PackageType :gig="gig" @addOrder="addOrder"/>
    </div>

  </section>

  <section v-else>
    loading..
  </section>
</template>
<script>

import ReviewList from '../cmps/ReviewList.vue'
import PackageType from '../cmps/PackageType.vue'
import GigDetailsCarusela from '../cmps/GigDetailsCarusela.vue'
import FAQ from '../cmps/FAQ.vue'
import AboutSeller from '../cmps/AboutSeller.vue'

import { gigService } from '../services/gig.service.local.js'
import { orderService } from '../services/order.service.local.js'
import { userService } from '../services/user.service.local'

export default {
  data() {
    return {
      gig: null,
      darkMode: false
    }
  },

  async created() {
    try {
      this.loadGig()
    } catch (err) {
      console.error('Could not load gig')
    }
  },
  methods: {
    async loadGig() {
      try {
        const { gigId } = this.$route.params
        const gig = await gigService.getById(gigId)
        this.gig = gig
      } catch (err) {
        console.error('Failed to load gig', err)
      }
    },
    onDarkMode() {
      this.darkMode = !this.darkMode
    },
    async addOrder() {
      try{
        const Order = orderService.getEmptyOrder()
        const loggenInUser = await userService.getLoggedinUser()
        console.log(loggenInUser);
        const newOrder = {
          // _id: Order._id,
          buyer: {
            _id: loggenInUser._id,
            fullname: loggenInUser.fullname,
            username: loggenInUser.username,
            imgUrl: loggenInUser.imgUrl,
          },
          seller: {
            _id: this.gig.owner._id,
            fullname: this.gig.owner.fullname,
            imgUrl: this.gig.owner.imgUrl,
          },
          gig: {
            _id: this.gig._id,
            name: this.gig.title,
            imgUrls: this.gig.imgUrls,
            price: this.gig.price },
            status: "pending"
          }
          console.log(newOrder);

          await this.$store.dispatch({type: 'addOrder', newOrder})
          
          console.log(this.$store.getters.orders);
          
        } catch(err) {
          console.error(err)
          console.log(err)
        }
      }
  },
  computed: {
  },
  components: {
    ReviewList,
    PackageType,
    GigDetailsCarusela,
    FAQ,
    AboutSeller,
  },
}
</script>
  