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
			filters: {
				type: null,
				txt: null,
				min: null,
				max: null,
				delivery: null,
				subCategory: null,
			},
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
		this.loadGigsFromQuery()
	},
	watch: {
		'$route.query': {
			handler() {
				this.loadGigsFromQuery()
			},
			deep: true,
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
			const { txt, min, max, delivery, subCategory } = this.$route.query

			const filterBy = {
				txt: txt || null,
				min: min || null,
				max: max || null,
				delivery: delivery || null,
				subCategory: subCategory || null,
			}

			this.$store.dispatch({
				type: 'loadGigs',
				filterBy,
			})
		},
	},
}
</script>
