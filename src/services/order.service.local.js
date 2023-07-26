
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.local.js'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    // addOrderMsg
}
window.cs = orderService


async function query(filterBy = { buyer: '', seller: ''}) {
    var orders = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        orders = orders.filter(order => regex.test(order.buyer) || regex.test(order.seller))
    }
    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        // Later, owner is set by the backend
        order.buyer = userService.getLoggedinUser()
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    // Later, this is all done by the backend
    const order = await getById(orderId)
    if (!order.msgs) order.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    order.msgs.push(msg)
    await storageService.put(STORAGE_KEY, order)

    return msg
}

function getEmptyOrder() {
    return {
        _id: '',
        buyer: '',
        seller: '',
        gig: {},
        status: ''
    }
}

// Initial data
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY,  {"_id": "o1225","buyer": "mini-user","seller": "mini-user","gig": {"_id": "i101","name": "Design Logo","imgUrl": "","price": 20},"status": "pending"})
//     await storageService.post(STORAGE_KEY,  {"_id": "o1226","buyer": "mini-user","seller": "mini-user","gig": {"_id": "i102","name": "Design Logo","imgUrl": "","price": 20},"status": "inProgress"})
//     await storageService.post(STORAGE_KEY,  {"_id": "o1227","buyer": "mini-user","seller": "mini-user","gig": {"_id": "i103","name": "Design Logo","imgUrl": "","price": 20},"status": "pending"})
//     await storageService.post(STORAGE_KEY,  {"_id": "o1228","buyer": "mini-user","seller": "mini-user","gig": {"_id": "i104","name": "Design Logo","imgUrl": "","price": 20},"status": "complited"})
// })()



const orders = [
    {"_id": "o1225",
    "buyer": "mini-user",
    "seller": "mini-user",
    "gig": {"_id": "i101","name": "Design Logo","imgUrl": "","price": 20},
    "status": "pending"}
  ]
  