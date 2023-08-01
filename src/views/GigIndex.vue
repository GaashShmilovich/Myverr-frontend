<template>
	<div class="gig-list-container">
		<ExploreHeader></ExploreHeader>
		<hr class="index-separator-line" />
		<GigFilter @filterChanged="onFilterChanged"></GigFilter>
		<SortGigs
			:gigCount="gigs.length"
			@sortChanged="onSortChanged"
		></SortGigs>
		<GigList :gigs="gigs"></GigList>
	</div>
</template>

<script>
import GigList from '../cmps/ExploreCmps/GigList.vue'
import GigFilter from '../cmps/ExploreCmps/GigFilter.vue'
import SortGigs from '../cmps/ExploreCmps/SortGigs.vue'
import ExploreHeader from '../cmps/ExploreCmps/ExploreHeader.vue'

export default {
	data() {
		return {
			// gigs: [],
		}
	},
	components: {
		GigList,
		GigFilter,
		SortGigs,
		ExploreHeader,
	},
	computed: {
		gigs() {
			return this.$store.state.gigStore.gigs
		},
	},
	created() {
		if (this.$route.query.txt) {
			this.$store.dispatch({
				type: 'loadGigs',
				filterBy: {
					type: 'txt',
					txt: this.$route.query.txt,
				},
			})
		} else {
			this.loadGigs()
		}
	},
	watch: {
		// Watch for changes in the route
		'$route.query.txt': {
			handler: 'loadGigsFromQuery',
			immediate: true,
		},
		'$route.query': {
			handler: 'loadGigsFromQuery',
			deep: true, // Deep watch to catch any nested changes
			immediate: true,
		},
	},
	methods: {
		loadGigs() {
			this.$store.dispatch({ type: 'loadGigs' })
		},
		onFilterChanged(filterBy) {
			this.$store.dispatch({ type: 'loadGigs', filterBy })
		},
		onSortChanged(sortBy) {
			this.$store.dispatch({
				type: 'loadGigs',
				sortBy,
				filterBy: this.$store.state.gigStore.filterBy,
			})
		},
		loadGigsFromQuery() {
			const { txt, min, max, delivery, category } = this.$route.query

			const filterBy = {
				type: category ? 'category' : 'txt',
				txt,
				min,
				max,
				delivery,
				category,
			}

			this.$store.dispatch({
				type: 'loadGigs',
				filterBy,
			})
		},
	},
}
</script>
