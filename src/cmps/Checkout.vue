<template>
    <h1>Checkout</h1>
    <div class="checkout">
        <section class="gig-prev">
            <!-- <img :src="gig.imgurls" alt=""> -->
            <span>title:{{ gig.title }}</span>
        </section>

        <section class="type-package">
            <span>type: {{ packageType }}</span>
        </section>

        <p>Enter promo code</p>
        <section class="fees">
            <p>Service fee</p>
            <p>VAT</p>
        </section>

        <section class="totals">
            <p>Total <span> {{ gig.price }}</span></p>
            <p>Total delivery time</p>
        </section>

        <button>Confirm & Pay </button>
        
        <section>
            <p>SSL Secure Payment </p>
            <p>You will be charged₪83.34. Total amount includes currency conversion fees </p>
        </section>
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
    created() {


    },
    methods: {
        getType() {
            const { type } = this.$route.params
            console.log(type);
            return type
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
        }
    },
}
</script>