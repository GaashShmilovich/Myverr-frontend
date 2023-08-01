<template>

    <div class="checkout">
        <div class="upper-section">
        <section class="gig-prev">
            <img :src="gig.imgurls" alt="">
            <span>title:{{ gig.title }}</span>
        </section>

        <section class="type-package">
            <span class="title">type: {{ packageType }}</span> 
            <!-- <span class="price"> {{ packageType.price }}</span> -->
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

        <button>Confirm & Pay </button>
        
        <section> 
            <p class="ssl">SSL Secure Payment </p>
            <p class="be-charged">You will be charged₪83.34. Total amount includes currency conversion fees </p>
        </section>
        </div>
    </div>
</template>

<script>
import { gigService } from '../services/gig.service.local';

export default {
    data() {
        return {
            packageType: this.getType(),
            gig: this.getGig()
        }
    },
    props: {
        user: Object,
    },
    methods: {
        getType() {
            // const { type } = this.$route.params
            // console.log(type);
            // return type
            console.log(this.user);
            console.log(this.user.orders);
        },
        async getGig() {
            try {
                const { id } = this.$route.params
                console.log(id);
                const gig = await gigService.getById(id)
                console.log(gig);
                console.log(gig.title);
                this.gig = gig
            } catch (err) {
                console.log(err);
            }
        },

    },
}
</script>