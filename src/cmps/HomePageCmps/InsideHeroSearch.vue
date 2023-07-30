<template>
  <section class="inside-hero-container">
    <div class="lines">
      <h1 class="first-line">Find the right <i>freelance</i></h1>
      <h1 class="second-line">service, right away</h1>
    </div>
    <span class="search-bar-wrapper">
      <SearchBar />
    </span>
    <div class="popular">
      Popular:
      <ul>
        <!-- Add the click event listener to call the function with the category name -->
        <li>
          <p @click="navigateToExplore('Website Design')">Website Design</p>
        </li>
        <li>
          <p @click="navigateToExplore('WordPress')">WordPress</p>
        </li>
        <li>
          <p @click="navigateToExplore('Logo Design')">Logo Design</p>
        </li>
        <li>
          <p @click="navigateToExplore('AI Services')">AI Services</p>
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
