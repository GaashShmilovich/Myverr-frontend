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
				<label class="delivery-input">
					<span class="custom-radio-btn"></span
					><input type="radio" value="1" v-model="deliveryTime" />
					Express 24h
				</label>
				<label class="delivery-input">
					<input type="radio" value="3" v-model="deliveryTime" />
					Up to 3 days
				</label>
				<label class="delivery-input">
					<input type="radio" value="7" v-model="deliveryTime" />
					Up to 7 days
				</label>
				<label class="delivery-input">
					<input type="radio" value="999" v-model="deliveryTime" />
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
	</section>
</template>

<script>
export default {
	data() {
		return {
			filterBy: null,
			minBudget: null,
			maxBudget: null,
			deliveryTime: 999,
		}
	},
	methods: {
		setFilter(filterType) {
			this.filterBy = this.filterBy === filterType ? null : filterType
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

			this.$emit('filterChanged', {
				type: 'budget',
				min: min,
				max: max,
			})
			this.filterBy = null
		},

		applyDelivery() {
			this.$emit('filterChanged', {
				type: 'delivery',
				delivery: this.deliveryTime,
			})
			this.filterBy = null
		},
		clearDelivery() {
			this.$emit('filterChanged', {
				type: 'delivery',
				delivery: 999,
			})
			this.deliveryTime = null
			this.filterBy = null
		},
	},
}
</script>
