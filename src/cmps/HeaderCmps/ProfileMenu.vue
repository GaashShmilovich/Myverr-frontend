<template>
  <div class="profile-menu-container" v-if="isMenuOpen">
    <ul class="profile-menu-list">
      <li>
        <RouterLink
          @click="isMenuOpen = false"
          :to="'/user/' + loggedInUser._id"
          >Profile</RouterLink
        >
      </li>
      <li>
        <a @click="doLogout">Logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    loggedInUser: Object,
    isMenuOpen: Boolean, // Receive the "isMenuOpen" prop from the parent component
  },
  methods: {
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
  },
};
</script>
