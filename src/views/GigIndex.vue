<template>
	<div class="gig-list-container">
		<div v-if="showMobileFilterModal" class="mobile-filter-modal">
			<div class="explore-mobile-modal-header">
				<button
					@click="handleAllButtonClick"
					class="close-mobile-modal-btn"
				>
					✖
				</button>
				<h1 class="header-mobile-modal-explore">All Filters</h1>
				<button class="clear-mobile-modal-btn">Clear All</button>
			</div>

			<div class="mobile-price-filter-container">
				<h1 class="mobile-price-filter-header">Price range</h1>
				<div class="input-labels">
					<p class="min-btn">MIN.</p>
					<p class="max-btn">MAX.</p>
				</div>
				<div class="input-fields">
					<input
						class="budget-input mobile-budget-input"
						type="number"
						placeholder="$ Any"
						v-model="minBudget"
						min="1"
					/>
					<i class="minus-mobile-sign">-</i>
					<input
						class="budget-input mobile-budget-input right-budget-input"
						type="number"
						placeholder="$ Any"
						v-model="maxBudget"
					/>
				</div>
			</div>
			<div class="mobile-delivery-filter-container">
				<h1 class="mobile-delivery-header">Gig delivery time</h1>
				<div class="delivery-options-mobile">
					<button
						:class="{
							'selected-delivery-option': deliveryTime === '1',
						}"
						@click="deliveryTime = '1'"
					>
						Express 24h
					</button>
					<button
						:class="{
							'selected-delivery-option': deliveryTime === '3',
						}"
						@click="deliveryTime = '3'"
					>
						Up to 3 days
					</button>
					<button
						:class="{
							'selected-delivery-option': deliveryTime === '7',
						}"
						@click="deliveryTime = '7'"
					>
						Up to 7 days
					</button>
					<button
						:class="{
							'selected-delivery-option': deliveryTime === '999',
						}"
						@click="deliveryTime = '999'"
					>
						Anytime
					</button>
				</div>
			</div>
			<div class="mobile-level-filter-container">
				<h1 class="mobile-level-header">Seller level</h1>
				<div class="seller-mobile-options">
					<button class="selected-seller-lvl-option">
						Top Rated Seller
					</button>
					<button class="selected-seller-lvl-option">
						Level Two
					</button>
					<button class="selected-seller-lvl-option">
						Level One
					</button>
				</div>
			</div>
			<div class="mobile-on-filter-container">
				<h1 for="onlineSwitch" class="mobile-on-filter-text">
					Seller is currently online
				</h1>
				<div class="switch">
					<input type="checkbox" id="onlineSwitch" />
					<span class="slider"></span>
				</div>
			</div>

			<div class="results-btn-container">
				<button class="results-btn">Show Results</button>
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

	<section class="explore-pagination-container">
		<a class="explore-pagination-left-arrow">➜</a>
		<a class="explore-pagination-page-num first-page">1</a>
		<a class="explore-pagination-page-num">2</a>
		<a class="explore-pagination-page-num">3</a>
		<a class="explore-pagination-page-num">4</a>
		<a class="explore-pagination-page-num">5</a>
		<a class="explore-pagination-page-num">6</a>
		<a class="explore-pagination-page-num">7</a>
		<a class="explore-pagination-page-num">8</a>
		<a class="explore-pagination-page-num">9</a>
		<a class="explore-pagination-page-num">10</a>
		<a class="explore-pagination-right-arrow">➜</a>
	</section>
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
		},

		loadGigs() {
			this.$store.dispatch({ type: 'loadGigs' })
		},
		onFilterChanged(filterBy) {
			// this.$store.dispatch({ type: 'loadGigs', filterBy })
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
			console.log(
				'🚀 ~ file: GigIndex.vue:191 ~ loadGigsFromQuery ~ filterBy:',
				filterBy
			)

			this.$store.dispatch({
				type: 'loadGigs',
				filterBy,
			})
		},
	},
}
</script>
