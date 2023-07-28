<template>
  <section v-if="gig" class="gig-details" :class="{ darkmode: darkMode }">
    <div class="main">
      <button @click="onDarkMode">Dark Mode</button>
      <!-- <h5 class="gig-category"> {{ gig.chosenTag }}</h5> -->
      <h5 class="gig-category">/ logo-design / artisitic</h5>
      <h1 class="gig-title"> {{ gig.title }}</h1>

      <section class="gig-owner-details">
        <img :src="gig.owner.imgUrl" alt="">
        <span class="name">{{ gig.owner.fullname }}</span>
        <span class="instagram">{{ gig.owner.instagram }}</span>
        <span class="level">{{ gig.owner.level }} |</span>

        <section class="gig-owner-rate">
          <span v-for="i in gig.owner.rate || 1">
            <font-awesome-icon :style="{ color: '#ffb33e' }" icon="fa-solid fa-star" />
          </span>
        </section>

        <p class="rate-number" :style="{ color: '#ffb33e' }">{{ gig.owner.rate }} <span>(592)</span></p>
      </section>


      <figure class="gig-gallery">
        <GigDetailsCarusela :gig="gig" />
      </figure>

      <p class="about-title">About this gig </p>
      <div class="about"> {{ gig.description }}</div>

      <p class="title">About the seller</p>
      <section class="about-the-seller">
        <img :src="gig.owner.imgUrl" alt="">
        <section class="details">
          <span class="name">{{ gig.owner.fullname }}</span>
          <span class="instagram">{{ gig.owner.instagram }}</span>
          <p class="moto">{{ gig.owner?.moto }}</p>

          <section class="gig-owner-rate">
            <span v-for="i in gig.owner.rate || 1">
              <font-awesome-icon :style="{ color: '#ffb33e' }" icon="fa-solid fa-star" />
            </span>
            <span class="rate-number" :style="{ color: '#ffb33e' }">{{ gig.owner.rate }} <span>(592)</span></span>
          </section>

          <button class="btn-contact">Contact Me</button>
        </section>

      </section>
        <section class="information">
          <section class="titles">
            <p class="1">From <br><span>USA</span> </p>
            <p class="2">Avg. response time <br><span>1 hour</span> </p>
            <p class="3">Languages <br><span>English</span> </p>
            <p class="4">Member since <br><span>Dec 2015</span> </p>
            <p class="5">Last delivery <br><span>1 day ago</span> </p>
          </section>
          <p class="text">Hello! I'm an enthusiastic and creative graphic artist who
            is passionate about Logo and Banner Design! And have many more skills!

            I'm a fun loving guy who loves nature, pets and dressing up! I'm also a bit of a perfectionist!

            I freelance exclusively on Fiverr!</p>
        </section>

      <ReviewList :reviews="gig.reviews" />
    </div>

    <div class="sticky-packages">
      <PackageType />
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

import { gigService } from '../services/gig.service.local.js'

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
    }
  },
  computed: {
  },
  components: {
    ReviewList,
    PackageType,
    GigDetailsCarusela,
  },
}
</script>
  