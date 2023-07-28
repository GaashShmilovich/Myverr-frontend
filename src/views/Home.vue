<template>
  <section class="home-container main-layout">
    <!-- <div class="homepage-layout"> -->
    <Hero />
    <StripBelowHero />
    <PopularCarousel />
    <!-- </div> -->
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
