<template>
	<section class="filter-btns-container">
		<!-- Budget Button and Modal -->
		<div class="filter-group-mobile">
			<button @click="openMobileFilterModal" class="all-btn filter-btn">
				<i v-html="$getSvg('slider')"></i>
				All
			</button>

			<button
				class="budget-btn filter-btn"
				:class="{ active: filterBy === 'budget' }"
				@click="setFilter('budget')"
			>
				Budget <span class="arrow-btn"></span>
			</button>
			<div v-if="filterBy === 'budget'" class="modal budget-modal">
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
				<div class="actions">
					<button class="clear-btn" @click="clearBudget">
						Clear All
					</button>
					<button class="apply-btn" @click="applyBudget">
						Apply
					</button>
				</div>
			</div>
		</div>

		<!-- Delivery Button and Modal -->
		<div class="filter-group">
			<button
				class="delivery-btn filter-btn"
				:class="{ active: filterBy === 'delivery' }"
				@click="setFilter('delivery')"
			>
				Delivery Time <span class="arrow-btn"></span>
			</button>
			<div v-if="filterBy === 'delivery'" class="modal delivery-modal">
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

				<hr class="divider-delivery" />
				<div class="actions">
					<button class="clear-btn" @click="clearDelivery">
						Clear All
					</button>
					<button class="apply-btn" @click="applyDelivery">
						Apply
					</button>
				</div>
			</div>
			<button class="seller-lvl-btn filter-btn">Seller Level</button>
		</div>
		<section class="seller-filter-container">
			<div class="checkbox-container">
				<input type="checkbox" class="seller-filter-btn" />
				<p class="filter-checkbox-text">Pro services</p>
			</div>
			<div class="checkbox-container">
				<input type="checkbox" class="seller-filter-btn" />
				<p class="filter-checkbox-text">Local sellers</p>
			</div>
			<div class="checkbox-container">
				<input type="checkbox" class="seller-filter-btn" />
				<p class="filter-checkbox-text online-sellers-btn">
					Online sellers
				</p>
			</div>
		</section>
		<!-- Applied Filters Display -->
	</section>
	<template v-if="showFilters">
		<div class="applied-filters">
			<div
				v-if="minBudget || (maxBudget && maxBudget !== 99999)"
				class="filter-pill"
			>
				{{ displayMinBudget }}$ - {{ displayMaxBudget }}$
				<button @click="clearBudget">✕</button>
			</div>
			<div
				v-if="deliveryTime !== 999 && deliveryTimeDisplay"
				class="filter-pill"
			>
				{{ this.deliveryTimeDisplay }}
				<button @click="clearDelivery">✕</button>
			</div>
			<!-- Add more filter pills as required -->
		</div>
	</template>
</template>

<script>
export default {
	emits: ['filterChanged', 'allButtonClicked'],
	data() {
		return {
			filterBy: null,
			minBudget: null,
			maxBudget: null,
			deliveryTime: 999,
			activeFilters: [],
			deliveryTimeDisplay: null,
			displayMinBudget: null,
			displayMaxBudget: null,
			showFilters: false,
			showMobileFilterModal: false,
		}
	},
	created() {
		const params = this.$route.query
		if (params.min) {
			this.minBudget = params.min
			this.displayMinBudget = params.min
			this.applyBudget()
		}
		if (params.max) {
			this.maxBudget = params.max
			this.displayMaxBudget = params.max
			this.applyBudget()
		}
		if (params.delivery) {
			this.deliveryTime = params.delivery
			this.applyDelivery()
		}
		if (params.subCategory) {
		}
	},
	methods: {
		openMobileFilterModal() {
			this.showMobileFilterModal = !this.showMobileFilterModal
			this.$emit('allButtonClicked')
		},
		setFilter(filterType) {
			this.filterBy = this.filterBy === filterType ? null : filterType
		},
		addFilter(type, label) {
			this.activeFilters.push({ type, label })
		},
		removeFilter(type) {
			this.activeFilters = this.activeFilters.filter(
				(filter) => filter.type !== type
			)
		},
		clearBudget() {
			this.$emit('filterChanged', {
				type: 'budget',
				min: 1,
				max: 99999,
			})
			this.minBudget = null
			this.maxBudget = null
			this.displayMinBudget = 1
			this.displayMaxBudget = null
			this.filterBy = null

			let updatedQuery = { ...this.$route.query }
			delete updatedQuery.min
			delete updatedQuery.max
			this.$router.push({ query: updatedQuery })
		},
		applyBudget() {
			const min = this.minBudget || 1
			const max = this.maxBudget || 99999
			this.displayMinBudget = min
			this.displayMaxBudget = max

			// Preserve the current query parameters and update only the relevant ones
			let updatedQuery = { ...this.$route.query, min, max }
			this.$router.push({ query: updatedQuery })

			this.$emit('filterChanged', {
				type: 'budget',
				min: min,
				max: max,
				delivery: this.deliveryTime,
			})
			this.filterBy = null
			this.showFilters = true
		},

		applyDelivery() {
			switch (this.deliveryTime) {
				case '1':
					this.deliveryTimeDisplay = 'Express 24h'
					break
				case '3':
					this.deliveryTimeDisplay = 'Up to 3 days'
					break
				case '7':
					this.deliveryTimeDisplay = 'Up to 7 days'
					break
				default:
					this.deliveryTimeDisplay = null
			}

			let updatedQuery = {
				...this.$route.query,
				delivery: this.deliveryTime,
			}
			this.$router.push({ query: updatedQuery })

			this.$emit('filterChanged', {
				type: 'delivery',
				delivery: this.deliveryTime,
				min: this.minBudget || 1,
				max: this.maxBudget || 99999,
			})
			this.filterBy = null
			this.showFilters = true
		},
		clearDelivery() {
			this.$emit('filterChanged', {
				type: 'delivery',
				delivery: 999,
			})
			this.deliveryTime = 999
			this.deliveryTimeDisplay = null
			this.filterBy = null

			let updatedQuery = { ...this.$route.query }
			delete updatedQuery.delivery
			this.$router.push({ query: updatedQuery })
		},

		resetFilterState() {
			this.filterBy = null
			this.minBudget = null
			this.maxBudget = null
			this.deliveryTime = 999
			this.activeFilters = []
			this.deliveryTimeDisplay = null
			this.displayMinBudget = null
			this.displayMaxBudget = null
			this.showFilters = false
		},
	},
	// watch: {
	// 	'$route.query': {
	// 		handler(newQuery) {
	// 			if (!newQuery.min && !newQuery.max) {
	// 				this.clearBudget()
	// 			}
	// 			if (!newQuery.delivery) {
	// 				this.clearDelivery()
	// 			}
	// 			if (Object.keys(newQuery).length === 0) {
	// 				this.resetFilterState()
	// 			}
	// 		},
	// 	},
	// },
}
</script>
