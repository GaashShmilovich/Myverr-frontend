<template>
  <section class="home-container main-layout">
    <!-- <div class="homepage-layout"> -->
    <Hero />
    <InsideHeroSearch />
    <StripBelowHero />
    <PopularCarousel />
    <div class="best-part-wrapper full">
      <BestPart />
    </div>
    <MainCategories />

    <!-- </div> -->
  </section>
</template>

<script>
import Hero from "../cmps/HomePageCmps/Hero.vue";
import StripBelowHero from "../cmps/HomePageCmps/StripBelowHero.vue";
import PopularCarousel from "../cmps/HomePageCmps/popularCarousel.vue";
import InsideHeroSearch from "../cmps/HomePageCmps/insideHeroSearch.vue";
import BestPart from "../cmps/HomePageCmps/BestPart.vue";
import MainCategories from "../cmps/HomePageCmps/MainCategories.vue";
export default {
  name: "home",
  components: {
    Hero,
    StripBelowHero,
    PopularCarousel,
    InsideHeroSearch,
    BestPart,
    MainCategories,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>
