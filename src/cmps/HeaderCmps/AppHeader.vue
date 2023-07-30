<template>
  <header
    ref="header"
    class="full main-layout"
    :class="{
      openHeader: isFirstNavShown,
      'main-layout': isFirstNavShown,
      'is-sticky': isSticky,
      // 'nav-main-app': isNotHomePage,
    }"
  >
    <div
      class="nav-container full main-layout"
      :class="{
        'open-nav-border': isFirstNavShown,
        'is-sticky': isSticky,
      }"
    >
      <nav>
        <RouterLink to="/">
          <div
            class="logo"
            :class="{
              'open-nav-logo': isFirstNavShown,
              'is-sticky': isSticky,
            }"
          >
            fiverr <span>.</span>
          </div>
        </RouterLink>
        <div
          class="search hidden"
          :class="{
            hidden: isHidden,
            shown: modalOpen,
          }"
        >
          <SearchBar />
        </div>
        <div
          class="route-container full"
          :class="{
            'open-nav-links': isFirstNavShown,
            'is-sticky': isSticky,
          }"
        >
          <RouterLink to="/explore">Explore</RouterLink>
          <RouterLink to="/login">Login / Signup</RouterLink>
          <RouterLink to="/explore/edit?">Edit</RouterLink>
        </div>
      </nav>
    </div>
    <nav
      class="categories"
      :class="{
        hidden: isHidden,
        shown: modalOpen,
      }"
    >
      <ul class="category-container main-layout">
        <li>
          <a @click="navigateToExplore('Graphics & Design')"
            >Graphics & Design</a
          >
        </li>
        <li>
          <a @click="navigateToExplore('Programming & Tech')"
            >Programming & Tech</a
          >
        </li>
        <li>
          <a @click="navigateToExplore('Digital Marketing')"
            >Digital Marketing</a
          >
        </li>
        <li>
          <a @click="navigateToExplore('Video & Animation')"
            >Video & Animation</a
          >
        </li>
        <li>
          <a @click="navigateToExplore('Writing & Translation')"
            >Writing & Translation</a
          >
        </li>
        <li>
          <a @click="navigateToExplore('Music & Audio')">Music & Audio</a>
        </li>
        <li><a @click="navigateToExplore('Business')">Business</a></li>
        <li><a @click="navigateToExplore('Data')">Data</a></li>
        <li><a @click="navigateToExplore('Photography')">Photography</a></li>
        <li><a @click="navigateToExplore('AI Services')">AI Services</a></li>
      </ul>
    </nav>
  </header>
</template>
<script>
import SearchBar from "./SearchBar.vue";
export default {
  data() {
    return {
      windowTop: window.top.scrollY,
      isFirstNavShown: false,
      modalOpen: false,
      orderOpen: false,
      menuOpen: false,
      isHidden: true,
      isSticky: true,
      // isShown: false,
    };
  },
  methods: {
    navigateToExplore(category) {
      this.$router.push({ path: "/explore", query: { category } });
    },
    onScroll(e) {
      // if (this.$route.path !== "/") return;
      if (window.scrollY < 10) this.isFirstNavShown = false;
      if (window.scrollY > 10) {
        this.isFirstNavShown = true;
        this.isSticky = true;
      }
      if (window.scrollY < 160) {
        this.modalOpen = false;
        this.isHidden = true;
      }
      if (window.scrollY > 160) {
        this.modalOpen = true;
        this.isHidden = false;
        this.isSticky = true;
      }
      if (this.$route.path !== "/") {
        this.isFirstNavShown = true;
        this.modalOpen = true;
        this.isHidden = false;
        this.isSticky = false;
      }
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    currRoutePath() {
      return this.$route.path;
    },
    isNotHomePage() {
      if (this.$route.path !== "/") {
        this.isFirstNavShown = true;
        this.modalOpen = true;
        this.isHidden = false;
      }
    },
  },

  created() {
    window.addEventListener("scroll", this.onScroll);
  },

  unmounted() {
    window.removeEventListener("scroll", this.onScroll);
  },
  watch: {
    $route(to) {
      if (to.path === "/") {
        this.isFirstNavShown = false;
        this.modalOpen = false;
        this.isHidden = true;
      }
    },
  },
  components: {
    SearchBar,
  },
};
</script>
<style lang="scss">
// .search {
//   display: none;
// }
// .shown {
//   display: block;
// }
</style>
