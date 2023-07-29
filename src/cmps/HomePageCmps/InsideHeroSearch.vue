<template>
  <section class="inside-hero-container main-layout">
    <div class="lines">
      <h1 class="first-line">Find the right <i>freelance</i></h1>
      <h1 class="second-line">service, right away</h1>
    </div>
    <span class="search-bar-wrapper">
      <SearchBar />
    </span>
    <div class="popular main-layout">
      Popular:
      <ul>
        <li><a href="#"></a>Website Design</li>
        <li><a href="#"></a>WordPress</li>
        <li><a href="#"></a>Logo Design</li>
        <li><a href="#"></a>AI Services</li>
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
  methods: {},
  mounted() {},
};
</script>
