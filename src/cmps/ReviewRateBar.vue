<template>
    <table class="rate-bars">
        <tr v-for="i in stars" class="row" :class="{'faded' : !getRateCount(i)}">
            <span class="num">{{ i }}</span> <span>Stars</span> <td class="progress-bar-container">
            <td class="progress-bar" :style="{ width: `${getPrecentage(i)}%` }"></td>
            </td><span>({{ getRateCount(i) }})</span>
        </tr>
    </table>
</template>

<script>
export default {
    props: {
        reviews: Array
    },
    data() {
        return {
            stars: [5, 4, 3, 2, 1]
        }
    },
    methods: {
        getRateCount(num) {
            const countRate = this.reviews.reduce((count, review) => (review.rate === num ? count + 1 : count), 0);
            return countRate
        },
        getPrecentage(num) {
            const sum = this.getRateCount(1) + this.getRateCount(2) + this.getRateCount(3) + this.getRateCount(4) + this.getRateCount(5)
            // const sum = 0
            // for (var j = 1; j <= 5; j++) {
            //     console.log(j);
            //     console.log(this.getRateCount(j));
            //     sum += this.getRateCount(j)
            // }
            return this.getRateCount(num) / sum * 100
        }
    }
}
</script>