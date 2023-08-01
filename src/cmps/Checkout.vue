<template>
    <div class="checkout">
        <div class="upper-section">
            <section class="gig-prev">
                <img :src="imgs[0]" alt="">
                <span>{{ gig.title }}</span>
            </section>

            <section class="type-package">
                <section class="header">
                    <span class="title">{{ package.title }}</span>
                    <span class="price"> {{ package.price }}</span>
                </section>

                <section class="benefits">
                    <span>{{ package.benefit1 }}</span>
                    <span>{{ package.benefit2 }}</span>
                </section>
                <ul class="specials">
                    <li v-for="special in package.specials">
                        <i class="v-check" v-html="$getSvg('v-check')"></i>
                        {{ special }}
                    </li>
                </ul>
            </section>
        </div>
        <div class="bottom-section">
            <p class="promo-code">Enter promo code</p>
            <section class="fees">
                <p>Service fee</p>
                <p>VAT</p>
            </section>

            <section class="totals">
                <p class="total">Total <span> {{ gig.price }}</span></p>
                <p class="delivery-time">Total delivery time</p>
            </section>

            <section class="confirm">
            <RouterLink class="btn-pay" @click="addOrder" :to="'/user/' + user._id">Confirm & Pay </RouterLink>
            </section>
            <section class="secure">
                <p class="ssl">SSL Secure Payment </p>
                <p class="be-charged">You will be charged₪83.34. Total amount includes currency conversion fees </p>
            </section>
        </div>
    </div>
</template>

<script>
import { gigService } from '../services/gig.service.local';
import { userService } from '../services/user.service.local';

export default {
    data() {
        return {
            gig: this.getGigDetails(),
            imgs: [],
            package: {},
            user: userService.getLoggedinUser(),
        }
    },
    
    methods: {
        async getGigDetails() {
            try {
                const { id } = this.$route.params
                const gig = await gigService.getById(id)
                this.gig = gig
                this.imgs = gig.imgUrls

                const { type } = this.$route.params
                if (type === 'basic') {
                    this.package = gig.packages[0]
                } else if (type === 'standard') {
                    this.package = gig.packages[1]
                } else if (type === 'premium') {
                    this.package = gig.packages[2]
                }
            } catch (err) {
                console.log(err);
            }
        },

        async addOrder() {
            try {
                const loggenInUser = await userService.getLoggedinUser()
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
                        price: this.gig.price
                    },
                    packageType: {
                        level: this.package.level,
                        price: this.package.price,
                        title: this.package.title,
                        benefit1: this.package.benefit1,
                        benefit2: this.package.benefit2,
                        specials: this.package.specials
                    },
                    status: "pending",

                }
               await this.$store.dispatch({ type: 'addOrder', createdOrder })
                
                console.log( this.$store.getters.orders);
               
            } catch (err) {
                console.error(err)
                console.log(err)
            }
        }

    },
}
</script>