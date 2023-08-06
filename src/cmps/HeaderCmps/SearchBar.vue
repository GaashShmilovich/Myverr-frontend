<template>
	<form @submit.prevent="submitSearch" class="search-form">
		<input v-model="searchQuery" type="text" :placeholder="placeholder" />
		<button type="submit">
			<i class="search" v-html="$getSvg('white-search')"></i>
		</button>
	</form>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			searchQuery: '',
		}
	},
	methods: {
		submitSearch() {
			this.$emit('search', this.searchQuery)
			console.log(
				'🚀 ~ file: SearchBar.vue:27 ~ submitSearch ~ this.$route.query:',
				this.$route.query
			)
			let updatedQuery = { ...this.$route.query, txt: this.searchQuery }

			this.$router.push({
				path: '/explore',
				query: updatedQuery,
			})
		},
	},
}
</script>
