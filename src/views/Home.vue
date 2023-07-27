<template>
  <section class="home-container">
    <Hero />
    <StripBelowHero />
  </section>
</template>

<script>
import Hero from "../cmps/HomePageCmps/Hero.vue";
import StripBelowHero from "../cmps/HomePageCmps/StripBelowHero.vue";
export default {
  name: "home",
  components: {
    Hero,
    StripBelowHero,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>
