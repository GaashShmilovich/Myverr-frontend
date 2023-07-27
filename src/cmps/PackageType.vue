<template>
    <div class="package-type" ref="packageType" :style="{ position: stickyModal ? 'fixed' : 'static' }">
        <section class="headers">
            <label @click="setType('basic')" :class="{ picked: type = 'basic' }">Basic</label>
            <label @click="setType('standard')" :class="{ picked: type = 'standard' }">Standard</label>
            <label @click="setType('premium')" :class="{ picked: type = 'premium' }">Premium</label>
        </section>

        <section class="price">
            <h1 v-if="type = 'basic'">58.50</h1>
            <h1 v-else="type='standard'">156</h1>
            <h1 v-else>292.50</h1>
            <p>Save up to 15% with <span>Subscribe to Save</span></p>
        </section>

        <section class="package-descreption">
            <p v-if="type = 'basic'"><span>The Gold Fish - Basic</span> Start-up and basic logos included. Good for Social
                media & small business owners (ex: Nike logo)</p>
            <p v-else="type='standard'"><span>The Dolphin - Recommended</span> Mid-Segment variants of logo. Highly
                recommended for pro business and printing (ex: AirBnb) </p>
            <p v-else><span>The Blue Whale - Premium</span> Ultimate and deep conceptual logo design. Must for premium
                business & high-end users (ex: Mercedes)</p>
        </section>

        <section class="benefits">
            <p v-if="type = 'basic'">
            <p>1 Day Delivery</p>
            <p>5 Revisions</p>
            </p>
            <p v-else="type='standard'">
            <p>1 Day Delivery</p>
            <p>7 Revisions</p>
            </p>
            <p v-else>
            <p>2 Days Delivery</p>
            <p>Unlimited Revisions</p>
            </p>
        </section>

        <RouterLink class="to-payment">Continue</RouterLink>
    </div>
</template>

<script>

export default {
    data() {
        return {
            type: 'basic',
            modalObserver: null,
            stickyModal: false
        }
    },
    methods: {
        setType(type) {
            this.type = type
        },
        onModalObserved(entries) {
            entries.forEach((entry) => {
                // this.stickyModal = entry.isIntersecting ? false : true;
                this.stickyModal = !entry.isIntersecting
            });
        },
    },
    mounted() {
        this.modalObserver = new IntersectionObserver(this.onModalObserved, {
            rootMargin: "-300px 0px 0px", threshold: 1,
        });
        this.modalObserver.observe(this.$refs.packageType);
    },
}
</script>