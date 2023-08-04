import { orderService } from '../services/order.service.local'
// import { orderService } from '../services/order.service'

export const orderStore = {
    state: {
        orders: []
    },
    getters: {
        orders({ orders }) { return orders },
    },
    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders
        },
        addOrder(state, { newOrder }) {
            state.orders.push(newOrder)
        },
        removeOrder(state, { orderId }) {
            state.orders = state.orders.filter(order => order._id !== orderId)
        },
        updateOrderStatus(state, { orderId, newStatus }) {
            const order = state.orders.find((order) => order._id === orderId)
            if (order) {
                order.status = newStatus
            }
        },
    },
    actions: {
        async addOrder(context, { createdOrder }) {
            try {
                const newOrder = await orderService.save(createdOrder)
                context.commit({ type: 'addOrder', newOrder })
                return newOrder
            } catch (err) {
                console.log('orderStore: Error in addOrder', err)
                throw err
            }
        },
        async loadOrders(context) {
            try {
                const orders = await orderService.query()
                context.commit({ type: 'setOrders', orders })
            } catch (err) {
                console.log('orderStore: Error in loadOrders', err)
                throw err
            }
        },
        async removeOrder(context, { orderId }) {
            try {
                await orderService.remove(orderId)
                context.commit({ type: 'removeOrder', orderId })
            } catch (err) {
                console.log('orderStore: Error in removeOrder', err)
                throw err
            }
        },
    }
}