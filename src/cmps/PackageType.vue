<template>
    <div class="package-type">
        <section class="headers">
            <label @click="setType('basic')" :class="{ picked: type === 'basic', unpicked: type !== 'basic' }">Basic</label>
            <label @click="setType('standard')"
                :class="{ picked: type === 'standard', unpicked: type !== 'standard' }">Standard</label>
            <label @click="setType('premium')"
                :class="{ picked: type === 'premium', unpicked: type !== 'premium' }">Premium</label>
        </section>

        <section class="price">
            <span> ${{ getType.price }} </span>
            <span class="save-up">Save up to 15% with <span>Subscribe to Save</span></span>
        </section>

        <section class="package-descreption">
            <span><span class="title"> {{ getType.title }}</span> {{ getType.description }}</span>
        </section>

        <section class="benefits">
            <i class="v-check" v-html="$getSvg('clock')"></i> <span>{{ getType.benefit1 }}</span>
            <!-- <span>{{ getType.benefit2 }}</span> -->
        </section>

        <ul class="specials">
            <li v-for="special in getType.specials">
                <i class="v-check" v-html="$getSvg('v-check')"></i>
                {{ special }}
            </li>
        </ul>

        <RouterLink class="to-payment" :to="'/payment/' + gig._id + '/' + type">Continue <i class="long-arrow-right"
                v-html="$getSvg('long-arrow-right')"></i></RouterLink>
        <!-- <RouterLink class="to-user-profile" :to="'/user' + user._id" :gig="gig">Continue</RouterLink> -->

    </div>
</template>

<script>

export default {
    data() {
        return {
            user: null,
            type: 'basic',
            chosenPackage: null
            // modalObserver: null,
            // stickyModal: false
        }
    },
    props: {
        gig: Object,
    },
    methods: {
        setType(chosenType) {
            this.type = chosenType
        },
        addOrder() {
            this.$emit('addOrder', this.chosenPackage)
        },
        printUser() {
            console.log(this.loggedUser);
        },
        confirmOrder() {
            console.log('order confirmed');
        }
    },
    computed: {
        getType() {
            switch (this.type) {
                case 'basic':
                    return this.gig.packages[0]
                case 'standard':
                    return this.gig.packages[1]
                case 'premium':
                    return this.gig.packages[2]
            }
        }
    },
}

</script>