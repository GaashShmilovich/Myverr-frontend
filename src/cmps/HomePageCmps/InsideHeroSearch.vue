<template>
	<section class="inside-hero-container hero-container main-layout">
		<h1>Find the right <i>freelance</i> service, right away</h1>
		<div class="search-bar-wrapper">
			<SearchBar />
		</div>
	</section>
</template>

<script>
import SearchBar from '../HeaderCmps/SearchBar'
export default {
	name: 'hero-search',
	components: {
		SearchBar,
	},
	data() {
		return {}
	},
	computed: {},
	methods: {},
	mounted() {},
}
</script>
