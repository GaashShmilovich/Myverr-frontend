<template></template>

<script>
export default {
  methods: {
    async addOrder() {
      try {
        const loggenInUser = await userService.getLoggedinUser();
        const createdOrder = {
          createdAt: new Date(),
          buyer: {
            _id: loggenInUser._id,
            fullname: loggenInUser.fullname,
            username: loggenInUser.username,
            imgUrl: loggenInUser.imgUrl,
          },
          seller: {
            _id: this.gig.owner._id,
            fullname: this.gig.owner.fullname,
            imgUrl: this.gig.owner.imgUrl,
          },
          gig: {
            _id: this.gig._id,
            name: this.gig.title,
            imgUrls: this.gig.imgUrls,
            price: this.package.price,
          },
          packageType: this.package.level,
          status: "pending",
        };
        await this.$store.dispatch({ type: "addOrder", createdOrder });
      } catch (err) {
        console.error(err);
      }
    },
  },
  actions: {
    async addOrder(context, { createdOrder }) {
      try {
        const newOrder = await orderService.save(createdOrder);
        context.commit({ type: "addOrder", newOrder });
        return newOrder;
      } catch (err) {
        console.log("orderStore: Error in addOrder", err);
        throw err;
      }
    },
  },
};
</script>
