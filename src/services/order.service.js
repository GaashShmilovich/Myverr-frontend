import { httpService } from './http.service.js'
import {  socketService, SOCKET_EVENT_ORDER_ADDED, SOCKET_EVENT_ORDER_FOR_YOU,
     SOCKET_EVENT_YOUR_ORDER_UPDATED } from './socket.service.js'
import { showSuccessMsg } from './event-bus.service.js'
import { store } from '../store/store.js'
import { utilService } from './util.service.js'
// import { orderService } from './order.service.js'

;(() => {
    setTimeout(() => {
    socketService.on(SOCKET_EVENT_ORDER_ADDED, (order) => {
        console.log('got from socket order added', order);
        store.commit({type: 'addOrder', order})
        showSuccessMsg(`There is a new order : ${order}`)
    })
    socketService.on(SOCKET_EVENT_ORDER_FOR_YOU, (order) => {
        showSuccessMsg(`You recieved a new order: ${order}`)
        console.log('got from socket order about you', order);
    })
    // socketService.on(SOCKET_EVENT_ORDER_UPDATED, (order) => {
    //     showSuccessMsg(`You recieved a new order: ${order}`)
    //     console.log('got from socket order about you', order);
    // })
    socketService.on(SOCKET_EVENT_YOUR_ORDER_UPDATED, (order) => {
        showSuccessMsg(`Your order status has changed. ${order}`)
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
    if (order._id) {
        savedOrder = await httpService.put(`order/${order._id}`, order)
    } else {
        console.log(order);
        // order.buyer = userService.getLoggedinUser()
        savedOrder = await httpService.post('order', order)
    }
    return savedOrder
}


function getEmptyOrder() {
    return {
     
    }
}


