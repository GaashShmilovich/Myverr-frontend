<template>
    <div class="faq-section">
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
          <span :class="{ 'open-icon': faq.isOpen, 'close-icon': !faq.isOpen }">
            {{ faq.isOpen ? '-' : '+' }}
          </span>
        </div>
        <div v-if="faq.isOpen" class="answer">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      faqs: [
        {
          question: 'What is Vue.js?',
          answer: 'Vue.js is a progressive JavaScript framework for building user interfaces.',
          isOpen: false,
        },
        {
          question: 'How do I get started with Vue?',
          answer: 'To get started with Vue, you need to install it using npm or yarn and create a new Vue instance.',
          isOpen: false,
        },
        // Add more FAQs as needed...
      ],
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
.faq-section {
  /* Add your FAQ section styles here */
}

.faq-item {
  /* Add your individual FAQ item styles here */
  margin-bottom: 10px;
  cursor: pointer;
}

.question {
  /* Add your question styles here */
  font-weight: bold;
}

.open-icon::before,
.close-icon::before {
  /* Add your icon styles here */
  content: '';
  margin-right: 5px;
}

.open-icon::before {
  /* Styles for the open icon (e.g., a minus sign) */
  /* content: '-'; */
}

.close-icon::before {
  /* Styles for the close icon (e.g., a plus sign) */
  /* content: '+'; */
}
.answer {
  /* Add your answer styles here */
  margin-top: 5px;
}
</style>