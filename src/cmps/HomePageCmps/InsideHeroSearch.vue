<template>
  <section class="inside-hero-container main-layout">
    <div class="lines">
      <h1 class="first-line">Find the right <i>freelance</i></h1>
      <h1 class="second-line">service, right away</h1>
    </div>
    <span class="search-bar-wrapper">
      <SearchBar placeholder="Search for any service..." />
    </span>
    <div class="popular">
      Popular:
      <ul>
        <!-- Add the click event listener to call the function with the category name -->
        <li>
          <a @click="navigateToExplore('Website Design')">Website Design</a>
        </li>
        <li>
          <a @click="navigateToExplore('WordPress')">WordPress</a>
        </li>
        <li>
          <a @click="navigateToExplore('Logo Design')">Digital Marketing</a>
        </li>
        <li>
          <a @click="navigateToExplore('AI Services')">AI Services</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import SearchBar from "../HeaderCmps/SearchBar.vue";
export default {
  name: "hero-search",
  components: {
    SearchBar,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    navigateToExplore(category) {
      this.$router.push({ path: "/explore", query: { category } });
    },
  },
  mounted() {},
};
</script>
