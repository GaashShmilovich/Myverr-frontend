<template>
	<div class="gig-sort-container">
		<div class="sort-by-container">
			<span>Sort by:</span>
			<span class="current-sort" @click="showModal = !showModal"
				>{{ currentSort }}<span> </span
			></span>
		</div>
		<div v-if="showModal" class="sort-modal-container">
			<div class="sort-modal-option" @click="setSort('Highest Rating')">
				Highest Rating
			</div>
			<div class="sort-modal-option" @click="setSort('Most Reviews')">
				Most Reviews
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentSort: 'Highest Rating',
			showModal: false,
		}
	},
	methods: {
		setSort(sortType) {
			this.currentSort = sortType
			this.showModal = false
			this.$emit('sortChanged', sortType)
		},
	},
}
</script>
