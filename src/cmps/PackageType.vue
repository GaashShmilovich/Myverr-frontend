<template>
    <div class="package-type">
        <section class="headers">
            <label @click="setType('basic')" :class="{ picked: type === 'basic' }">Basic</label>
            <label @click="setType('standard')" :class="{ picked: type === 'standard' }">Standard</label>
            <label @click="setType('premium')" :class="{ picked: type === 'premium' }">Premium</label>
        </section>

        <section class="price">
            <span> {{ getType.price }} </span>
            <span class="save-up">Save up to 15% with <span>Subscribe to Save</span></span>
        </section>

        <section class="package-descreption">
            <span><span class="title"> {{ getType.title }}</span> {{ getType.description }}</span>
        </section>

        <section class="benefits">
            <span>{{ getType.benefit1 }}</span>
            <span>{{ getType.benefit2 }}</span>
        </section>

        <ul class="specials">
            <li v-for="special in getType.specials">{{ special }}</li>
        </ul>

        <RouterLink class="to-payment" to="/payment">Continue</RouterLink>
    </div>
</template>

<script>

export default {
    data() {
        return {
            type: 'basic',
            // modalObserver: null,
            // stickyModal: false
        }
    },
    methods: {
        setType(chosenType) {
            console.log(chosenType);
            this.type = chosenType
            console.log(this.type);
        },

    },
    computed: {
        getType() {
            switch (this.type) {
                case 'basic':
                    return { price: 58, title: 'The Gold Fish - Basic', specials: ['Product imagery', '1 length variation', '20 seconds running time'], benefit1: '5 Day Delivery', benefit2: '2 Revisions', description: 'Start-up and basic logos included. Good for Socialmedia & small business owners (ex: Nike logo)' };
                case 'standard':
                    return { price: 120, title: 'The Dolphin - Recommended', specials: ['Voice over recording', 'Product imagery writing', '20 seconds running time'], benefit1: '2 Day Delivery', benefit2:'4 Revisions', description: 'Mid-Segment variants of logo. Highlyrecommended for pro business and printing (ex: AirBnb) ' };
                case 'premium':
                    return { price: 240, title: 'The Blue Whale - Premium', specials: ['Video editing', 'Script writing', '20 seconds running time'], benefit1: '1 Day Delivery' ,benefit2: '5 Revisions', description: 'Ultimate and deep conceptual logo design. Must for premiumbusiness & high-end users (ex: Mercedes)' };
            }
        }
    }
}
</script>