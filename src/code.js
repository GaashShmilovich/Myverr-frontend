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
