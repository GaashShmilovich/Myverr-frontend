<template lang="">
  <section class="review-preview" >
    <section class="review-by">
  <img class="reviewer-img" :src="review.by.imgUrl" alt="">
      <section class="review-by-name">
  <p class="fullname"> {{ review.by.fullname }}</p>
  <img class="country-img" :src="review.by.country.img" alt="">
  <span class="country-name"> {{ review.by.country.name }}</span>
      </section>
    </section>
    <section class="review-rate-time">
    <span v-for="i in review.rate || 1">
      <font-awesome-icon
        class="star yellow"
        icon="fa-solid fa-star"
      /> 
    </span> || 
    <span> {{ getTimeAgoSimple() }}</span>
    </section>
    <p class="review-txt"> {{ review.txt }}</p>
    <section class="helpful-grid">
    <p class="helpful">Helpful? 
      <span  @click="helpful('yes')" class="yes" :class="{'green': isHelpful === 'yes'}"><i class="like" v-html="$getSvg('like')"></i> Yes</span>
      <span @click="helpful('no')" class="no" :class="{'red': isHelpful === 'no'}"><i class="unlike" v-html="$getSvg('unlike')"></i> No</span>
    </p> 
    <span class="helpful-span" :class="{'show': isHelpful === 'yes'}">You found this review helpful.</span>
  </section>
  </section>
  
</template>
<script>
export default {
  props: {
    review: Object,
  },
  data() {
    return {
      createdAt: null,
      isHelpful: null,
      
    }
  },
  // created() {
  //   this.createdAt = this.getTimeAgo()
  // },

  methods: {
    getTimeAgoSimple() {
      if(this.review.createdAt === 'Just now') return 'Just now'
      else return `${this.review.createdAt} ago`
    },
    // getTimeAgo() {
    //   const currentTime = new Date();
    //   const timestampDate = new Date(this.review.createdAt);
    //   const timeDifference = currentTime - timestampDate;

    //   const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    //   const oneDay = 24 * oneHour; // 1 day in milliseconds
    //   const oneWeek = 7 * oneDay; // 1 week in milliseconds
    //   const oneMonth = 30 * oneDay; // 1 week in milliseconds
    //   const oneYear = 12 * oneMonth; // 1 week in milliseconds

    //   if (timeDifference < oneHour) {
    //     return Math.floor(timeDifference / (60 * 1000)) + ' minutes ago';
    //   } else if (timeDifference < oneDay) {
    //     return Math.floor(timeDifference / oneHour) + ' hours ago';
    //   } else if (timeDifference < oneWeek) {
    //     return Math.floor(timeDifference / oneDay) + ' days ago';
    //   } else if (timeDifference < oneMonth) {
    //     return Math.floor(timeDifference / oneWeek) + ' weeks ago';
    //   } else if (timeDifference < oneYear) {
    //     return Math.floor(timeDifference / oneMonth) + ' months ago';
    //   } else  if (timeDifference >= oneYear) {
    //     return Math.floor(timeDifference / oneYear) + ' years ago';
    //     } else {
    //       return 'Not working'
    //     }
    //   },
      helpful(ans) {
        this.isHelpful = ans
      }
    }

  }


</script>
