import { httpService } from './http.service.js'
import {  socketService, SOCKET_EVENT_ORDER_ADDED, SOCKET_EVENT_ORDER_FOR_YOU,
    SOCKET_EVENT_ORDER_UPDATED, SOCKET_EVENT_YOUR_ORDER_UPDATED } from './socket.service.js'
import { showSuccessMsg } from './event-bus.service.js'
import { store } from '../store/store.js'
import AppHeader from '../cmps/HeaderCmps/AppHeader.vue'
import { utilService } from './util.service.js'
// import { orderService } from './order.service.js'

;(() => {
    setTimeout(() => {
    socketService.on(SOCKET_EVENT_ORDER_ADDED, (order) => {
        alert('new order')
        // AppHeader.showNotification('new order')
        console.log('got from socket order added', order);
        store.commit({type: 'addOrder', order})
        showSuccessMsg(`There is a new order`)
    })
    socketService.on(SOCKET_EVENT_ORDER_FOR_YOU, (order) => {
        // AppHeader.showNotification('new order')
        alert('new order')
        store.commit({type: 'addOrder', order})
        showSuccessMsg(`You recieved a new order`)
        console.log(`You recieved a new order:`, order);
        
    })
    socketService.on(SOCKET_EVENT_ORDER_UPDATED, (order) => {
        alert('order updated')
        showSuccessMsg(`order updated`)
        store.commit({type: 'updateOrder', newOrder: order})
        console.log('got from socket order order updated')
    })
    socketService.on(SOCKET_EVENT_YOUR_ORDER_UPDATED, (order) => {
        alert('order updated')
        showSuccessMsg('order updated')
        store.commit({type: 'updateOrder', order})
        console.log('Order status has changed from socket', order);
    })
    }, 0)
})()

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    // add
}

window.cs = orderService // for console usage

async function query(filterBy = {}) {
    return httpService.get('order', filterBy)
}
function getById(orderId) {
    return httpService.get(`order/${orderId}`)
}

async function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}
async function save(order) {
    var savedOrder
    console.log(order);
    if (order._id) {
        console.log(order);
        savedOrder = await httpService.put(`order/${order._id}`, order)
    } else {
        console.log(order);
        // order.buyer = userService.getLoggedinUser()
        savedOrder = await httpService.post('order', order)
    }
    console.log(savedOrder);
    return savedOrder
}


function getEmptyOrder() {
    return {
     
    }
}




