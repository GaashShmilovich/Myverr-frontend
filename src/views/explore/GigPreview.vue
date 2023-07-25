<template>
    <router-link :to="{ name: 'GigDetails', params: { id: gig.id } }" class="gig-preview">
      <h3>{{ gig.title }}</h3>
      <p>{{ gig.description }}</p>
      <p>{{ gig.price }}</p>
    </router-link>
  </template>
  
  <script>
  export default {
    props: {
      gig: Object
    }
  }
  </script>