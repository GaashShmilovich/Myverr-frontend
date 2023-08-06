//  From Payment: 

async function addOrder() {
    try {
        const createdOrder = {
            createdAt: new Date(),
            sellerId: this.gig.owner._id,
            buyerId: this.user._id,
            gigId: this.gig._id,
            packageType: this.package.level,
            status: "pending",
        }
        await this.$store.dispatch({ type: 'addOrder', createdOrder })


        //  Send to Backend: 

        await storageService.post(STORAGE_KEY, order)


        // Backend:

        const collection = await dbService.getCollection('order')
        await collection.insertOne(recievedOrder)

        socketService.emitToUser({ type: 'order-for-you', data: order, userId: order.seller._id })


            ; (() => {
                setTimeout(() => {
                    socketService.on(SOCKET_EVENT_ORDER_ADDED, (order) => {
                        store.commit({ type: 'addOrder', order })
                        showSuccessMsg(`You recieved a new order!`)
                    })
                }, 0)
            })()



        //  Display the Orders:


        const criteria = _buildCriteria(filterBy)

        var orders = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $addFields: {
                    buyerObjId: { $toObjectId: '$buyerId' },
                    sellerObjId: { $toObjectId: '$sellerId' },
                    gigObjId: { $toObjectId: '$gigId' },
                },
            },
            {
                $lookup:
                {
                    localField: 'buyerObjId',
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
                    localField: 'sellerObjId',
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
                    localField: 'gigObjId',
                    from: 'gig',
                    foreignField: '_id',
                    as: 'gig'
                }
            },
            {
                $unwind: '$gig'
            },
            {
                $project: {
                    createdAt: 1,
                    status: 1,
                    buyer: { _id: 1, username: 1 },
                    seller: { _id: 1, username: 1 },
                    gig: { _id: 1, title: 1, price: 1 },
                },
            },
        ]).toArray()

        return orders