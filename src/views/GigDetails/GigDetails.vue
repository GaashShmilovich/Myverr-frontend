<template>
    <section>
        <h1> {{ gig.title }}</h1>
        <h3> {{ gig.owner }}</h3>
        <img src="" alt="">
        <p>  {{ gig.description }}</p>

      <PackageType />
      <ReviewList :gig.reviews="reviews" />
    </section>
  </template>
  <script>

  import ReviewList from '../cmps/GigDetails/ReviewList.vue'
  import PackageType from '../cmps/GigDetails/PackageType.vue'
  
  export default {
    props: {
        gig: Object
    },
    methods: {
    
    },
    computed: {
      
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
  