<template>
  <form class="search-form" @submit.prevent="submitSearch">
    <input v-model="searchQuery" type="text" placeholder="Search..." />
    <button type="submit"></button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    submitSearch() {
      this.$emit("search", this.searchQuery);
    },
  },
};
</script>
