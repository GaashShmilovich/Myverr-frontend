<template>
	<div class="gig-list-container">
		<div v-if="showMobileFilterModal" class="mobile-filter-modal">
			<div>
				<h1>-----Placeholder HEADER-----</h1>
			</div>

			<div>
				<h1>Price range</h1>
				<div class="input-labels">
					<p class="min-btn">MIN.</p>
					<p class="max-btn">MAX.</p>
				</div>
				<div class="input-fields">
					<input
						class="budget-input"
						type="number"
						placeholder="Any"
						v-model="minBudget"
						min="1"
					/>
					<input
						class="budget-input"
						type="number"
						placeholder="Any"
						v-model="maxBudget"
					/>
				</div>
			</div>
			<div>
				<h1>Gig delivery time</h1>
				<label class="delivery-input custom-radio">
					<input type="radio" value="1" v-model="deliveryTime" />
					<span class="custom-radio-btn"></span>
					Express 24h
				</label>
				<label class="delivery-input custom-radio">
					<input type="radio" value="3" v-model="deliveryTime" />
					<span class="custom-radio-btn"></span>
					Up to 3 days
				</label>
				<label class="delivery-input custom-radio">
					<input type="radio" value="7" v-model="deliveryTime" />
					<span class="custom-radio-btn"></span>
					Up to 7 days
				</label>
				<label class="delivery-input custom-radio">
					<input type="radio" value="999" v-model="deliveryTime" />
					<span class="custom-radio-btn"></span>
					Anytime
				</label>
			</div>
			<div>
				<h1>Seller level</h1>
				<button>Top Rated Seller</button>
				<button>Level Two</button>
				<button>Level One</button>
			</div>
			<div>
				<h1>Seller is currently online</h1>
				<input type="checkbox" />
			</div>

			<div>
				<button>Show Results</button>
			</div>
		</div>
		<ExploreHeader></ExploreHeader>
		<hr class="index-separator-line" />
		<GigFilter
			@allButtonClicked="handleAllButtonClick"
			@filterChanged="onFilterChanged"
		></GigFilter>
		<SortGigs
			:gigCount="gigs.length"
			@sortChanged="onSortChanged"
		></SortGigs>
		<GigList :gigs="gigs"></GigList>
		<ExploreFooter></ExploreFooter>
	</div>
</template>

<script>
import GigList from '../cmps/ExploreCmps/GigList.vue'
import GigFilter from '../cmps/ExploreCmps/GigFilter.vue'
import SortGigs from '../cmps/ExploreCmps/SortGigs.vue'
import ExploreHeader from '../cmps/ExploreCmps/ExploreHeader.vue'
import ExploreFooter from '../cmps/ExploreCmps/ExploreFooter.vue'

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
			showMobileFilterModal: false,
		}
	},
	components: {
		GigList,
		GigFilter,
		SortGigs,
		ExploreHeader,
		ExploreFooter,
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
		handleAllButtonClick() {
			this.showMobileFilterModal = !this.showMobileFilterModal
			console.log(5)
		},

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
