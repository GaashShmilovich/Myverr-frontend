<template>
	<section class="orders-manager-container">
		<div class="item">
			<span>Annual Revenue</span>
			<h3>$1,755</h3>
		</div>
		<div class="item">
			<span>Monthly Revenue</span>
			<h3>$146.25</h3>
		</div>
		<div class="item">
			<span>Completed Orders</span>
			<h3>53</h3>
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
					<th>Order date</th>
					<th>Total</th>
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
					<td>{{ order.buyer.username }}</td>
					<td>{{ order.gig.title }}</td>
					<td>{{ order.createdAt }}</td>
					<td>${{ order.gig.price }}</td>
					<td>{{ order.status }}</td>
				</tr>
			</tbody>
		</table>
	</section>

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
					<span class="buyer-name">{{ order.buyer.username }}</span>
					<span class="gig-title">Gig: {{ order.gig.title }}</span>
					<span class="order-date">Date: {{ order.createdAt }}</span>
				</div>
				<span class="order-price">${{ order.gig.price }}</span>
				<span class="order-status" :class="order.status">{{
					order.status
				}}</span>
			</div>
		</section>
	</section>

	<CustomModal
		:show="modalVisible"
		:order="selectedOrder"
		@close="modalVisible = false"
	/>

	<!----- FOOTER ----->

	<div class="mobile-explore-footer-container">
		<router-link
			to="/"
			class="explore-footer-icon mobile-explore-footer-home"
			v-html="$getSvg('bigger-home-icon')"
		></router-link>
		<i
			class="explore-footer-icon mobile-explore-footer-inbox"
			v-html="$getSvg('inbox-icon')"
		></i>
		<i
			class="explore-footer-icon mobile-explore-footer-search"
			v-html="$getSvg('white-search-big-2')"
		></i>
		<router-link
			to="/user/:id/orders"
			class="explore-footer-icon mobile-explore-footer-orders"
			v-html="$getSvg('notepad')"
		></router-link>
		<router-link
			to="/user/:id"
			class="explore-footer-icon mobile-explore-footer-profile"
			v-html="$getSvg('big-profile')"
		></router-link>
	</div>
</template>

<script>
import CustomModal from './CustomModal.vue'
import moment from 'moment'
export default {
	components: { CustomModal },
	props: { user: Object },
	data() {
		return { modalVisible: false, selectedOrder: null }
	},
	computed: {
		orders() {
			return this.$store.getters.orders
		},
		// monthlyRevenue() {
		//   const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
		//   const currentMonth = currentDate;
		//   return this.orders.reduce((total, order) => {
		//     const orderDate = moment().format("MMMM Do YYYY, h:mm:ss a")(
		//       order.createdAt
		//     );
		//     if (orderDate.getMonth() === currentMonth) {
		//       return total + order.gig.price;
		//     }
		//     return total;
		//   }, 0);
		// },
		// annualRevenue() {
		//   const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
		//   const currentYear = currentDate;
		//   return this.orders.reduce((total, order) => {
		//     const orderDate = moment().format("MMMM Do YYYY, h:mm:ss a")(
		//       order.createdAt
		//     );
		//     if (orderDate.getFullYear() === currentYear) {
		//       return total + order.gig.price;
		//     }
		//     return total;
		//   }, 0);
		// },
		pendingOrdersCount() {
			return this.orders.filter((order) => order.status === 'pending')
				.length
		},
		completedOrdersCount() {
			return this.orders.filter((order) => order.status === 'completed')
				.length
		},
	},
	mounted() {
		this.loadOrders()
	},
	methods: {
		async loadOrders() {
			try {
				await this.$store.dispatch({ type: 'loadOrders' })
				console.log(this.orders)
			} catch (err) {
				console.log('Error loading orders:', err)
			}
		},
		openModal(order) {
			this.selectedOrder = order
			// console.log("order", order);
			this.modalVisible = true
		},
		async onStatusChange(status) {
			try {
				const payload = {
					order: this.selectedOrder,
					status: status,
				}
				console.log(payload)
				// console.log('status changed to', status);
				await this.$store.dispatch({ type: 'updateOrder', payload })
				// this.$store.commit("updateOrderStatus", {
				//   orderId: this.selectedOrder._id,
				//   newStatus: status,
				// });
			} catch (err) {
				console.log('Error updating order status:', err)
			}
		},
	},
}
</script>
