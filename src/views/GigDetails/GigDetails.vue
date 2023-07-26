<template>
    <section v-if="gig">
        <h5 class="gig-category"></h5>
        <h1 class="gig-title"> {{ gig.title }}</h1>
        <h5 class="gig-owner-details">
          <img :src="gig.owner.imgUrl" alt="">
          <p class="name">{{ gig.owner.fullname }}</p>
          <p class="level">{{ gig.owner.level }}</p>
          <p class="rate">{{ gig.owner.rate }}</p>
        </h5>

        <img :src="gig.imgUrls" alt="">
        <p> Details: {{ gig.description }}</p>

      <PackageType />
      <ReviewList :gig.reviews="reviews" />
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
  