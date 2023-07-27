<template>
  <section class="home-container main-container">
    <Hero />
    <StripBelowHero />
    <PopularCarousel />
  </section>
</template>

<script>
import Hero from "../cmps/HomePageCmps/Hero.vue";
import StripBelowHero from "../cmps/HomePageCmps/StripBelowHero.vue";
import PopularCarousel from "../cmps/HomePageCmps/popularCarousel.vue";
export default {
  name: "home",
  components: {
    Hero,
    StripBelowHero,
    PopularCarousel,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>
