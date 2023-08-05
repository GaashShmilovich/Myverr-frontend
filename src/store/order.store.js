// import { orderService } from '../services/order.service.local'
import { orderService } from '../services/order.service'

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
        updateOrder(state, { newOrder }) {
            const idx = state.orders.findIndex(c => c._id === newOrder._id)
            state.orders.splice(idx, 1, newOrder)
        },
        setOrderStatus(state, { order, status }) {
            const currOrder = state.orders.find((o) => o._id === order._id);
            if (currOrder) {
              order.status = status;
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
        async updateOrder(context, { payload }) {
            try {
                const {order, status } = payload
                order.status = status
                console.log(order);
                newOrder = await orderService.save(order)
                context.commit({ type: 'updateOrder', newOrder})
                return newOrder
            } catch (err) {
                console.log('orderStore: Error in updateOrder', err)
                throw err
            }
        },
        async changeOrderStatus({ commit }, { order, status}) {
            commit('setOrderStatus', { order, status})
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