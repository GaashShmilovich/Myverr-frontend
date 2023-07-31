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
            <i :class="{ 'arrow-up': faq.isOpen, 'arrow-down': !faq.isOpen }" v-html="$getSvg('arrow-down')"></i>
        </div>
        <div :class="{'show': faq.isOpen}" class="answer">
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