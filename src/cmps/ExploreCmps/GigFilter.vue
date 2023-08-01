<template>
	<section class="filter-btns-container">
		<!-- Budget Button and Modal -->
		<div class="filter-group">
			<button
				class="budget-btn filter-btn"
				:class="{ active: filterBy === 'budget' }"
				@click="setFilter('budget')"
			>
				Budget <span></span>
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
					/>
					<input
						class="budget-input"
						type="number"
						placeholder="Any"
						v-model="maxBudget"
					/>
				</div>
				<hr class="divider-budget" />
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
				Delivery Time <span></span>
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
		</div>
		<section class="seller-filter-container">
			<div class="checkbox-container">
				<p class="filter-checkbox-text">Pro services</p>
				<input type="checkbox" class="seller-filter-btn" />
			</div>
			<div class="checkbox-container">
				<p class="filter-checkbox-text">Local sellers</p>
				<input type="checkbox" class="seller-filter-btn" />
			</div>
			<div class="checkbox-container">
				<p class="filter-checkbox-text">Online sellers</p>
				<input type="checkbox" class="seller-filter-btn" />
			</div>
		</section>
		<!-- Applied Filters Display -->
	</section>
	<template v-if="showFilters">
		<div class="applied-filters">
			<div v-if="minBudget || maxBudget" class="filter-pill">
				{{ minBudget || 'Any' }}$ - {{ maxBudget || 'Any' }}$
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
	data() {
		return {
			filterBy: null,
			minBudget: null,
			maxBudget: null,
			deliveryTime: 999,
			activeFilters: [],
			deliveryTimeDisplay: null,
			showFilters: false,
		}
	},
	methods: {
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
			this.filterBy = null
		},
		applyBudget() {
			const min = this.minBudget || 1
			const max = this.maxBudget || 99999
			this.addFilter('budget', `Budget: ${min} - ${max}`)

			this.$emit('filterChanged', {
				type: 'budget',
				min: min,
				max: max,
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

			this.$emit('filterChanged', {
				type: 'delivery',
				delivery: this.deliveryTime,
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
		},
	},
}
</script>
