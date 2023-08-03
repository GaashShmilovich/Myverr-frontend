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
		if (this.$route.query.txt) {
			this.$store.dispatch({
				type: 'loadGigs',
				filterBy: {
					type: 'txt',
					txt: this.$route.query.txt,
				},
			})
		} else if (this.$route.query.subCategory) {
			this.$store.dispatch({
				type: 'loadGigs',
				filterBy: {
					type: 'subCategory',
					subCategory: this.$route.query.subCategory,
				},
			})
		} else if (this.$route.query.min && this.$route.query.max) {
			this.$store.dispatch({
				type: 'loadGigs',
				filterBy: {
					type: 'budget',
					min: this.$route.query.min,
					max: this.$route.query.max,
				},
			})
		} else if (this.$route.query.delivery) {
			this.$store.dispatch({
				type: 'loadGigs',
				filterBy: {
					type: 'delivery',
					delivery: this.$route.query.delivery,
				},
			})
		} else {
			this.loadGigs()
		}
	},
	watch: {
		'$route.query': {
			handler() {
				if (this.$route.query.subCategory) {
					this.$store.dispatch({
						type: 'loadGigs',
						filterBy: {
							type: 'subCategory',
							subCategory: this.$route.query.subCategory,
						},
					})
				}
				if (this.$route.query.delivery) {
					this.$store.dispatch({
						type: 'loadGigs',
						filterBy: {
							type: 'delivery',
							delivery: this.$route.query.delivery,
						},
					})
				}
				if (this.$route.query.min && this.$route.query.max) {
					this.$store.dispatch({
						type: 'loadGigs',
						filterBy: {
							type: 'budget',
							min: this.$route.query.min,
							max: this.$route.query.max,
						},
					})
				}
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
			const { txt, min, max, delivery, category, subCategory } =
				this.$route.query

			const filterBy = {
				txt,
				min,
				max,
				delivery,
				category,
				subCategory,
			}

			this.$store.dispatch({
				type: 'loadGigs',
				filterBy,
			})
		},
	},
}
</script>
