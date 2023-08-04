<template>
    <div>
      <button @click="startListening" v-if="!isListening">Start Listening</button>
      <button @click="stopListening" v-else>Stop Listening</button>
      <p v-if="detectedWord">Detected word: {{ detectedWord }}</p>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['isListening', 'detectedWord']),
    },
    methods: {
      ...mapActions(['startListening', 'stopListening']),
    },
    mounted() {
      // Optionally, you can start listening when the component is mounted.
      // this.startListening();
    },
  };
  </script>