<template>
  <section v-if="gig" class="gig-details" :class="{ darkmode: darkMode }">
    <header class="gig-header">
      <p class="gig-category">
        
        <RouterLink to="/"><i class="home-icon" v-html="$getSvg('home-icon')"></i> </RouterLink>
        <span>/</span>
        <p>logo-design</p>
        <span>/</span>
        <p>artisitic</p>
      </p>

      <p class="gig-title">{{ gig.title }}</p>

      <section class="gig-owner-details">
        <img :src="gig.owner.imgUrl" alt="">
        <span class="name">{{ gig.owner.fullname }}</span>
        <span class="instagram">{{ gig.owner.instagram }}</span>
        <span class="level">{{ gig.owner.level }} |</span>

        <section class="gig-owner-rate">
          <span v-for="i in Math.ceil(gig.owner.rate) || 1">
            <font-awesome-icon class="star yellow" icon="fa-solid fa-star" />
          </span>
        </section>

        <p class="rate-number" :style="{ color: '#ffb33e' }">
          {{ gig.owner.rate }} <span>({{ gig.reviews.length }})</span>
        </p>
      </section>

      <figure class="gig-gallery">
        <GigDetailsCarusela :gig="gig" />
      </figure>
    </header>

    <div class="gig-about">
      <p class="about-title">About this gig </p>
      <!-- <VoiceInput /> -->
      <div class="about">{{ gig.description.title }}</div>
      <p class="des-question">{{ questions[0] }}</p>
      <ul>
        <li v-for="a in answers" class="des-answer">{{ a }}</li>
      </ul>
      <p class="des-question">{{ questions[1] }}</p>
      <ul>
        <li v-for="b in answers2" class="des-answer">{{ b }}</li>
      </ul>
      <p class="des-closer">{{ gig.description.closer }}</p>

      <p class="title">About the seller</p>
      <AboutSeller :gig="gig" />
      <FAQ :gig="gig" />
      <ReviewList :reviews="gig.reviews" />
      <div class="chat-button-container" @click="showChatRoom = !showChatRoom">
        <div class="avatar"><img :src="gig.owner.imgUrl" alt=""></div>
        <div class="content">
          <p>Message {{ gig.owner.fullname }}</p>
          <span>Available &#183 Avg. response time:
            <span class="time-to-make"> {{ gig.daysToMake }} Hour</span>
          </span>
        </div>
      </div>

      <ChatRoom
        v-if="showChatRoom"
        :gigId="gig._id"
        :userOnOtherSide="gig.owner"
        :msgHistory="gig?.msgs || []"
        @toggle-chat-room="toggleChatRoom"
      />
    </div>

    <div class="packages">
      <PackageType :gig="gig" />
    </div>
  </section>

  <section v-else>
    <Loader />
  </section>
</template>
<script>

import ReviewList from '../cmps/ReviewList.vue'
import PackageType from '../cmps/PackageType.vue'
import GigDetailsCarusela from '../cmps/GigDetailsCarusela.vue'
import FAQ from '../cmps/FAQ.vue'
import AboutSeller from '../cmps/AboutSeller.vue'
import VoiceInput from '../cmps/VoiceInput.vue'
import ChatRoom from '../cmps/ChatRoom.vue'
import Loader from '../cmps/Loader.vue'

// import { gigService } from '../services/gig.service.local.js'
import { gigService } from '../services/gig.service.js'
// import { orderService } from '../services/order.service.local.js'
// import { userService } from '../services/user.service.local'

export default {
  data() {
    return {
      gig: null,
      newOrder: null,
      darkMode: false,
      questions: null,
      answers: null,
      answers2: null,   
      showChatRoom: false,
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
        this.questions = gig.description.questions
        this.answers = gig.description.answers.splice(0,4)
        this.answers2 = gig.description.answers.splice(0, 4)
        console.log(this.gig);
      } catch (err) {
        console.error('Failed to load gig', err)
      }
    },
    toggleChatRoom() {
      console.log('Toggling chat room...');

    this.showChatRoom = !this.showChatRoom;
  },
    
  },
  computed: {
  },
  components: {
    ReviewList,
    PackageType,
    GigDetailsCarusela,
    FAQ,
    AboutSeller,
    VoiceInput,
    ChatRoom,
    Loader
  },
}
</script>
  