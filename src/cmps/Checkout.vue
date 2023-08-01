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
                {{ special }}</li>
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

            <button @click="confirmOrder">Confirm & Pay </button>

            <section>
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
            order: {}
        }
    },
    props: {
        user: Object,
    },
    methods: {
       
        async getGigDetails() {
            try {
                const { id } = this.$route.params
                console.log(id);
                const gig = await gigService.getById(id)
                console.log(gig);
                this.gig = gig
                this.imgs = gig.imgUrls
                // this.order = gig.orders
                // console.log(gig.orders[0]);

                const { type } = this.$route.params
                console.log(type);
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

        confirmOrder() {
            const loggedInUser = userService.getLoggedinUser()
            // loggedInUser.orders.push(newOrder)
          console.log(loggedInUser);
          console.log(loggedInUser.orders);
        }

    },
}
</script>