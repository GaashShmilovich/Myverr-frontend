<template>
  <form @submit.prevent="submitSearch" class="search-form">
    <input v-model="searchQuery" type="text" placeholder="Search..." />
    <button type="submit">
      <i class="search" v-html="$getSvg('white-search')"></i>
    </button>
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
