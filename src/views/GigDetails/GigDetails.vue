<template>
    <section v-if="gig">
        <h1> {{ gig.title }}</h1>
        <h3> {{ gig.owner }}</h3>
        <img src="" alt="">
        <p>  {{ gig.description }}</p>

      <PackageType />
      <ReviewList :gig.reviews="reviews" />
    </section>
  </template>
  <script>

  import ReviewList from '../../cmps/GigDetailsCmps/ReviewList.vue'
  import PackageType from '../../cmps/GigDetailsCmps/PackageType.vue'
  
  export default {
    data() {
      return {
        gig: null,
      }
    },
    watch: {
    gigId: {
      handler() {
        this.loadGig()
      },
      immediate: true,
    },
  },
    methods: {
      async loadGig() {
        if(!this.gigId) return
        try {
          const gig = await gigService.getById(this.gigId)
          this.gig = gig
        } catch(err){
          console.error('Failed to load gig', err)
        }
      },
    },
    computed: {
      gigId() {
      return this.$route.params.id
    },
      reviews() {
        return this.$store.getters.reviews // filter of this gig or user
      },
    },
    components: {
      ReviewList,
      PackageType
    },
  }
  </script>
  