<template>
	<div class="gig-sort-container">
		<div class="sort-by-container" @click="showModal = !showModal">
			<span>Sort by: {{ currentSort }}</span>
			<span class="sort-arrow"> 〱</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentSort: 'Best Selling',
		}
	},
	methods: {
		changeSort(sortType) {},
	},
}
</script>
