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
            console.log(newOrder);
            const idx = state.orders.findIndex(o => o._id === newOrder._id)
            state.orders.splice(idx, 1, newOrder)
        },
        setOrderStatus(state, { order, status }) {
            const idx = state.orders.findIndex(o => o._id === order._id)
                console.log(order);
                order.status = status
                console.log(order);
                state.orders.splice(idx, 1, order)
                // return order
            
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
        async updateOrder(context, order) {
            try {
                console.log(order);
                const newOrder = await orderService.save(order)
                console.log(newOrder);
                context.commit({ type: 'updateOrder', newOrder})
                return newOrder
            } catch (err) {
                console.log('orderStore: Error in updateOrder', err)
                throw err
            }
        },
        async changeOrderStatus({ commit }, { order, status}) {
            commit('setOrderStatus', { order, status})
            // const newOrder = await orderService.save(updatedOrder)
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