function addOrder() {
    try {
        const createdOrder = {
            createdAt: new Date(),
            sellerId: this.gig.owner._id,
            gigId: this.gig._id,
            packageType: this.package.level,
            status: "pending",
        }
        await this.$store.dispatch({ type: 'addOrder', createdOrder })

        console.log(this.$store.getters.orders);
    } catch (err) {
        console.error(err)
        console.log(err)
    }
}


async addOrder(context, { createdOrder }) {
    try {
        const newOrder = await orderService.save(createdOrder)
        context.commit({ type: 'addOrder', newOrder })
        return newOrder
    } catch (err) {
        console.log('orderStore: Error in addOrder', err)
        throw err
    }
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {

        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

// Backend:

var recievedOrder = req.body
order = await orderService.add(recievedOrder)

order.seller = await userService.getById(order.sellerId)

order.buyer = loggedinUser

delete order.sellerId
delete order.buyerId

socketService.broadcast({ type: 'order-added', data: order, userId: loggedinUser._id })
socketService.emitToUser({ type: 'order-for-you', data: order, userId: order.seller._id })



async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('order')
        // const orders = await collection.find(criteria).toArray()
        var orders = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'buyerId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'buyer'
                }
            },
            {
                $unwind: '$buyer'
            },
            {
                $lookup:
                {
                    localField: 'sellerId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            {
                $unwind: '$seller'
            },
            {
                $lookup:
                {
                    localField: 'gigId',
                    from: 'gig',
                    foreignField: '_id',
                    as: 'gig'
                }
            },
            {
                $unwind: '$gig'
            }
        ]).toArray()
        orders = orders.map(order => {
            order.buyer = { _id: order.buyer._id, fullname: order.buyer.fullname }
            order.seller = { _id: order.seller._id, fullname: order.seller.fullname }
            order.gig = { _id: order.gig._id, title: order.gig.title, price: order.gig.price }
            delete order.buyerId
            delete order.sellerId
            delete order.gigId
            return order
        })
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }

}
