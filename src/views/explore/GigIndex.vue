<template>
	<div class="gig-list-container">
		<GigFilter @filterChanged="onFilterChanged"></GigFilter>
		<SortGigs @sortChanged="onSortChanged"></SortGigs>
		<GigList :gigs="gigs"></GigList>
	</div>
</template>

<script>
import GigList from './GigList.vue'
import GigFilter from './GigFilter.vue'
import SortGigs from './SortGigs.vue'

export default {
	data() {
		return {
			gigs: [],
		}
	},
	components: {
		GigList,
		GigFilter,
		SortGigs,
	},
	computed: {
		gigs() {
			return this.$store.state.gigStore.gigs
		},
	},
	created() {
		this.loadGigs()
	},
	methods: {
		loadGigs() {
			this.$store.dispatch({ type: 'loadGigs' })
		},
		onFilterChanged(filterBy) {
			this.$store.dispatch({ type: 'loadGigs', filterBy })

			// This method is called when the filter is changed in the GigFilter component.
			// It dispatches an action to the store to load the gigs with the new filter.
			// The filterBy parameter is an object that contains the filter options.
			// The loadGigs action in the store will use these options to filter the gigs.
		},
		onSortChanged(sortBy) {
			this.$store.dispatch({
				type: 'loadGigs',
				sortBy,
				filterBy: this.$store.state.gigStore.filterBy,
			})
		},
	},
}
</script>
