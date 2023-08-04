import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
// import { orderService } from './order.service.js'

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
            score: 100
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
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}