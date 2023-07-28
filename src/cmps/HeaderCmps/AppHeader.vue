<template>
  <header
    ref="header"
    class="full"
    :class="{
      openHeader: isFirstNavShown,
      'main-layout': isFirstNavShown,
      'nav-main-app': isNotHomePage,
    }"
  >
    <div
      class="nav-container full main-layout"
      :class="{
        'open-nav-border': isFirstNavShown,
      }"
    >
      <nav>
        <RouterLink to="/">
          <div
            class="logo"
            :class="{
              'open-nav-logo': isFirstNavShown,
            }"
          >
            <a href="#"> fiverr <span>.</span></a>
          </div>
        </RouterLink>
        <!-- <SearchBar /> -->
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
          }"
        >
          <RouterLink to="/explore">Explore</RouterLink>
          <RouterLink to="/review">Reviews</RouterLink>
          <RouterLink to="/chat">Chat</RouterLink>
          <RouterLink to="/login">Login / Signup</RouterLink>
          <RouterLink to="/explore/edit?">Edit</RouterLink>
          <RouterLink to="/explore/edit?">Filler</RouterLink>
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
        <li><a href="#">Graphics & Design</a></li>
        <li><a href="#">Programming & Tech</a></li>
        <li><a href="#">Digital Marketing</a></li>
        <li><a href="#">Video & Animation</a></li>
        <li><a href="#">Writing & Translation</a></li>
        <li><a href="#">Music & Audio</a></li>
        <li><a href="#">Business</a></li>
        <li><a href="#">Data</a></li>
        <li><a href="#">Photography</a></li>
        <li><a href="#">AI Services</a></li>
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
      // isShown: false,
    };
  },
  methods: {
    onScroll(e) {
      if (this.$route.path !== "/") return;
      if (window.scrollY < 10) this.isFirstNavShown = false;
      if (window.scrollY > 10) {
        this.isFirstNavShown = true;
      }
      if (window.scrollY < 160) {
        this.modalOpen = false;
        this.isHidden = true;
      }
      if (window.scrollY > 160) {
        this.modalOpen = true;
        this.isHidden = false;
      }
      if (this.isNotHomePage) {
        this.isFirstNavShown = true;
        this.modalOpen = true;
        this.isHidden = false;
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
      return this.$route.path !== "/";
    },
  },

  created() {
    window.addEventListener("scroll", this.onScroll);
  },

  unmounted() {
    window.removeEventListener("scroll", this.onScroll);
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
