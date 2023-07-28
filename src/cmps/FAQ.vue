<template >
    <section class="faq">
    <h2>FAQ</h2>

    <div class="questions">
        <div @click="toggleAnswer(1)" :class="{'open' : showAnswer === 1}">Why is a logo so important? <i class="arrow-down" v-html="$getSvg('arrow-down')"></i> </div>
        <p :class="{'exposed' : showAnswer === 1}">Every business has a logo to represent its values and attributes in the market and public. But not all the logos are capable of taking the business effectively to the people. Design of a logo usually plays a major role in the marketing of an organization and its business in the competitive market.</p>
        <div @click="toggleAnswer(2)" :class="{'open' : showAnswer === 2}">What you can expect from working with me? <i class="arrow-down" v-html="$getSvg('arrow-down')"></i></div>  
        <p :class="{'exposed' : showAnswer === 2}">I am obsessed with helping businesses find their visual voice! My approach goes beyond aesthetics, shapes, and colors... and starts with a clear understanding of your business, the competitive landscape, and the vision you have for your product.</p>
        <div @click="toggleAnswer(3)" :class="{'open' : showAnswer === 3}">What do i need to get started? <i class="arrow-down" v-html="$getSvg('arrow-down')"></i> </div>
        <p :class="{'exposed' : showAnswer === 3}">It was never as easy as placing the order on my gig. You will be asked few basic questions like your logo company name, slogan, color etc after you place the order.</p>
        <div @click="toggleAnswer(4)" :class="{'open' : showAnswer === 4}">Do you work with other different styles? <i class="arrow-down" v-html="$getSvg('arrow-down')"></i> </div> 
        <p :class="{'exposed' : showAnswer === 4}">Yes, I would adapt to the requirements, but also I will give you professional advice on which style fit the most to your brand.</p>
        <div @click="toggleAnswer(5)" :class="{'open' : showAnswer === 5}">What is client and project? <i class="arrow-down" v-html="$getSvg('arrow-down')"></i> </div>
        <p :class="{'exposed' : showAnswer === 5}">Design is a two-way process and your input is vital. We will discuss what you want to achieve with this project, and in what direction you would like the work to take. I will use this information to develop ideas and design.</p>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            showAnswer: false
        }
    },
    methods: {
        toggleAnswer(num) {
            this.showAnswer = num
            console.log(num);
        }
    }
}
</script>