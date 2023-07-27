<template>
	<section class="filter-btns-container">
		<!-- Budget Button and Modal -->
		<div class="filter-group">
			<button class="budget-btn filter-btn" @click="setFilter('budget')">
				Budget <span></span>
			</button>
			<div v-if="filterBy === 'budget'" class="modal">
				<div class="input-labels">
					<p class="min-btn">MIN.</p>
					<p class="max-btn">MAX.</p>
				</div>
				<div class="input-fields">
					<input
						type="number"
						placeholder="Any"
						v-model="minBudget"
					/>
					<input
						type="number"
						placeholder="Any"
						v-model="maxBudget"
					/>
				</div>
				<hr class="divider" />
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
				@click="setFilter('delivery')"
			>
				Delivery Time <span></span>
			</button>
			<div v-if="filterBy === 'delivery'" class="modal">
				<label>
					<input
						type="radio"
						value="24h"
						v-model="deliveryTime"
					/>Express 24h
				</label>
				<label>
					<input type="radio" value="3days" v-model="deliveryTime" />
					Up to 3 days
				</label>
				<label>
					<input type="radio" value="7days" v-model="deliveryTime" />
					Up to 7 days
				</label>
				<label>
					<input
						type="radio"
						value="anytime"
						v-model="deliveryTime"
					/>Anytime
				</label>
				<button @click="applyDelivery">Apply</button>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			filterBy: null,
			minBudget: null,
			maxBudget: null,
			deliveryTime: null,
		}
	},
	methods: {
		setFilter(filterType) {
			this.filterBy = this.filterBy === filterType ? null : filterType
		},
		clearBudget() {
			this.minBudget = null
			this.maxBudget = null
		},
		applyBudget() {
			this.$emit('filterChanged', {
				type: 'budget',
				min: this.minBudget,
				max: this.maxBudget,
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
	},
}
</script>
