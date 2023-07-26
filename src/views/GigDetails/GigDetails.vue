<template>
    <section v-if="gig" class="gig-details">
      <div class="main">
        <!-- <h5 class="gig-category"> {{ filterby.category }}</h5> --> //recive prop from explore
        <h1 class="gig-title"> {{ gig.title }}</h1>
        <h5 class="gig-owner-details">
          <img :src="gig.owner.imgUrl" alt="">
          <p class="name">{{ gig.owner.fullname }}</p>
          <p class="instagram">{{ gig.owner.instagram }}</p>
          <p class="level">{{ gig.owner.level }}</p>
          <span v-for="i in gig.owner.rate || 1">
            <font-awesome-icon
            :style="{ color: '#ffb33e' }"
            icon="fa-solid fa-star"
            />
          </span>
          <p class="rate-number" :style="{ color: '#ffb33e' }">{{ gig.owner.rate }} </p>
        </h5>

        <figure class="gig-gallery">
          <img :src="gig.imgUrls" alt="">
        </figure>
        <h2>About this gig: </h2>
        <p> {{ gig.description }}</p>

      <ReviewList :reviews="gig.reviews" />
    </div>

    <div class="sticky-packages">
      <PackageType />
      
    </div>
    </section>
 
    <section v-else>
      Gig wasnt found
    </section>
  </template>
  <script>

  import ReviewList from '../../cmps/GigDetailsCmps/ReviewList.vue'
  import PackageType from '../../cmps/GigDetailsCmps/PackageType.vue'

  import { gigService } from '../../services/gig.service.local.js'
  
  export default {
    data() {
      return {
        gig: null,
      }
    },

    // props: {
    //   filterBy: String
    // },

  //   watch: {
  //   gigId: {
  //     handler() {
  //       this.loadGig()
  //     },
  //     immediate: true,
  //   },
  // },
    async created() {
      try{
        this.loadGig()
      } catch(err){
        console.log('Could not load gig')
      }
    },
    methods: {
      async loadGig() {
        try {
          const { gigId } = this.$route.params
          console.log(gigId);
          const gig = await gigService.getById(gigId)
          this.gig = gig
          console.log(gig);
        } catch(err){
          console.error('Failed to load gig', err)
        }
      },
    },
    computed: {
    //   gigId() {
    //   return this.$route.params.id
    // },

      reviews() {
        return this.$store.getters.reviews // filter of this gig or user
      },
    },
    components: {
      ReviewList,
      PackageType,
      gigService,
    },
  }
  </script>
  