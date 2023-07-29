<template>
    <div class="faq-section">
        <h2>FAQ</h2>

      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="faq-item"
      >
        <div
          class="question"
          @click="toggleAnswer(index)"
        >
          {{ faq.question }}
          <!-- <span :class="{ 'open-icon': faq.isOpen, 'close-icon': !faq.isOpen }"> -->
            <!-- {{ faq.isOpen ? '-' : '+' }} -->
            <i :class="{ 'arrow-up': faq.isOpen, 'arrow-down': !faq.isOpen }" v-html="$getSvg('arrow-down')"></i>
            <!-- <i v-else class="arrow-up" v-html="$getSvg('arrow-down')"></i> -->
          <!-- </span> -->
        </div>
        <div v-if="faq.isOpen" class="answer">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </template>

<script>
export default {
    props: {
        gig: Object
    },
  data() {
    return {
        faqs: this.gig.faqs
    //   faqs: [
    //     {
    //       question: 'What is Vue.js?',
    //       answer: 'Vue.js is a progressive JavaScript framework for building user interfaces.',
    //       isOpen: false,
    //     },
    //     {
    //       question: 'How do I get started with Vue?',
    //       answer: 'To get started with Vue, you need to install it using npm or yarn and create a new Vue instance.',
    //       isOpen: false,
    //     },
    //     // Add more FAQs as needed...
    //   ],
    
    };
  },
  methods: {
    toggleAnswer(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    },
  },
};
</script>

<style>

</style>