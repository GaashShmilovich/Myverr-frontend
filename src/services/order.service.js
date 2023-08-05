import { httpService } from './http.service.js'
import {  socketService, SOCKET_EVENT_ORDER_ADDED, SOCKET_EVENT_ORDER_ABOUT_YOU } from './socket.service.js'
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
    socketService.on(SOCKET_EVENT_ORDER_ABOUT_YOU, (order) => {
        showSuccessMsg(`You recieved a new order: ${order}`)
        console.log('got from socket order about you', order);
    })
    }, 0)
})()

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    add
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

async function add(order) {
    try {
        // peek only updatable fields!
        const orderToAdd = {
            ordername: order.ordername,
            password: order.password,
            fullname: order.fullname,
            imgUrl: order.imgUrl,
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        return orderToAdd
    } catch (err) {
        logger.error('cannot add order', err)
        throw err
    }
}


function getEmptyOrder() {
    return {
     
    }
}


