<template>
	<section class="orders-manager-container">
		<div class="item">
			<span>Annual Revenue</span>
			<h3>${{ annualRevenue }}</h3>
		</div>
		<div class="item">
			<span>Monthly Revenue</span>
			<h3>${{ monthlyRevenue }}</h3>
		</div>
		<div class="item">
			<span>Completed Orders </span>
			<h3>{{ completedOrdersCount }}</h3>
		</div>
		<div class="item">
			<span>Pending Orders </span>
			<h3>{{ pendingOrdersCount }}</h3>
		</div>
	</section>
	<section class="table-container">
		<table class="table table-striped">
			<thead>
				<tr>
					<th></th>
					<th>Buyer</th>
					<th>Gig</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(order, i) in orders"
					:key="order._id"
					@click="openModal(order)"
				>
					<th scope="row">{{ i + 1 }}</th>
					<td class="buyer">
						<div class="buyer-content">
							<img
								class="user-image"
								:src="getOrderBuyerImage(order)"
								alt="Buyer Image"
							/>
							<span class="username">{{
								order?.buyer.username
							}}</span>
						</div>
					</td>
					<td>{{ order?.gig.title }}</td>
					<td>{{ order?.status }}</td>
				</tr>
			</tbody>
		</table>
	</section>
	<CustomModal
		v-if="modalVisible"
		:order="selectedOrder"
		@close="modalVisible = false"
	/>
	<section class="mobile-orders-container">
		<h1 class="mobile-orders-header">My Orders</h1>
		<p class="mobile-orders-sort">
			Sort <i class="mobile-orders-slider">≡</i>
		</p>
		<section class="mobile-orders-list-container">
			<div
				v-for="(order, i) in orders"
				:key="order._id"
				class="mobile-order-card"
				@click="openModal(order)"
			>
				<div class="order-info">
					<img
						class="mobile-buyer-image"
						:src="getOrderBuyerImage(order)"
						alt="Buyer Image"
					/>
					<span class="buyer-name">{{ order.buyer.username }}</span>
					<span class="gig-title">{{ order.gig.title }}</span>
					<span class="order-date">{{
						formatDate(order.createdAt)
					}}</span>
				</div>
				<span class="order-price">${{ order.gig.price }}</span>
				<span class="order-status" :class="order.status">{{
					order.status
				}}</span>
			</div>
		</section>
	</section>
	<CustomModal
		v-if="modalVisible"
		:order="selectedOrder"
		@close="modalVisible = false"
	/>
	<exploreFooter />
</template>

<script>
import { socketService } from '../../services/socket.service'
import { userService } from '../../services/user.service'
import CustomModal from './CustomModal.vue'
import moment from 'moment'
import exploreFooter from '../ExploreCmps/ExploreFooter.vue'

export default {
	components: { CustomModal, exploreFooter },
	props: { user: Object },
	data() {
		return {
			modalVisible: false,
			selectedOrder: null,
			users: [],
		}
	},
	computed: {
		monthlyRevenue() {
			return this.orders.reduce((total, order) => {
				return total + order.gig.price
			}, 0)
		},

		annualRevenue() {
			return this.orders.reduce((total, order) => {
				return total + order.gig.price
			}, 0)
		},
		pendingOrdersCount() {
			return this.orders.filter((order) => order.status === 'pending')
				.length
		},
		completedOrdersCount() {
			return this.orders.filter((order) => order.status === 'completed')
				.length
		},
		orders() {
			const orders = this.$store.getters.orders
			return orders
		},
		gigs() {
			return this.$store.getters.gigs
		},
	},
	async created() {
		await this.loadOrders()
		socketService.on('on-order-added', (order) => {
			this.loadOrders()
		})
		try {
			this.users = await userService.getUsers()
			console.log('users', this.users)
		} catch (error) {
			console.error('Error loading users:', error)
		}
	},
	unmounted() {
		socketService.off('on-order-added')
	},
	methods: {
		async loadOrders() {
			try {
				await this.$store.dispatch({ type: 'loadOrders' })
			} catch (err) {
				console.log('Error loading orders:', err)
			}
		},
		formatDate(dateString) {
			// Specify the format in which the date string is given
			if (!moment(dateString, 'MMMM Do YYYY, h:mm:ss a').isValid())
				return 'N/A'
			return moment(dateString, 'MMMM Do YYYY, h:mm:ss a').format(
				'YYYY-MM-DD'
			)
		},
		openModal(order) {
			console.log('Clicked on order:', order)

			this.selectedOrder = order
			this.modalVisible = true
		},
		getOrderBuyerImage(order) {
			if (order && order.buyer) {
				const buyer = this.users.find(
					(user) => user._id === order.buyer._id
				)
				if (buyer) {
					return buyer.imgUrl
				}
			}
			return '' // Return an empty string if no buyer or image URL is available
		},
	},
}
</script>
