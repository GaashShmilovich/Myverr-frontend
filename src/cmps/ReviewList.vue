<template lang="">
    <section class="reviews">
      <p class="title">Reviews</p> 

      <p class="sub-title">{{ reviews?.length }} reviews for this Gig
        <span v-for="i in getAverageRateRounded "> 
          <font-awesome-icon
          class="star yellow"
          icon="fa-solid fa-star"
          />
        </span>
        <span class="rate-number yellow">{{ getAverageRate }}</span>
  </p>

      <ReviewRateBar :reviews="reviews" />

      <form class="search-form" @submit.prevent="searchReview">
    <input type="text" class="input" placeholder="Search reviews" v-model="searchTxt" />
    <button type="submit" ><i class="search-icon" v-html="$getSvg('search-icon')"></i></button>
      </form>
      
      <div>
      <p class="sortBy">Sort By <span class="place-holder" @click="openModal">{{ sortBy.placeHolder }}</span><span :class="{ 'arrow-up': sortBy.isOpen, 'arrow-down': !sortBy.isOpen }" v-html="$getSvg('arrow-down')"  @click="openModal"></span></p>  
      <p class="sortByModal" :class="{'hidden': !sortBy.isOpen}">
      <a @click="setSort('Most recent')"><i :class="{'hidden': sortBy.placeHolder !== 'Most recent'}" class="v-check" v-html="$getSvg('v-check')"></i>Most recent</a>
      <a @click="setSort('Highest rate')"><i :class="{'hidden': sortBy.placeHolder !== 'Highest rate'}" class="v-check" v-html="$getSvg('v-check')"></i>Highest rate</a>
      <a @click="setSort('Lowest rate')"><i :class="{'hidden': sortBy.placeHolder !== 'Lowest rate'}" class="v-check" v-html="$getSvg('v-check')"></i>Lowest rate</a>
      </p>
    </div>

      <section class="add-review">
        <button class="btn-add-rev" @click="toggleAddReviewInput">Add Review</button>
        <AddReview @addReview="addReview" v-if="addReviewInput"/>
      </section>

      <ul class="review-list">
        <li
          v-for="review in filteredReviews"
          class="reviews-list"
          :key="review._id"
        >
          <ReviewPreview :review="review" />
        </li>
      </ul>
    </section>
    <p class="see-more" @click="seeMore">+ See More </p>
  </template>
<script>
import ReviewPreview from './ReviewPreview.vue'
import ReviewRateBar from './ReviewRateBar.vue'
import AddReview from './AddReview.vue'
export default {
  props: {
    reviews: Array,
    
  },
  data() {
    return {
      searchTxt: '',
      filteredReviews: [],
      reviewsShown: 3,
      reviewsToAdd: 3,
      addReviewInput: false,
      sortBy: {
      isOpen: false,
      placeHolder: 'Most recent',
      types: ['Most recent','Highest rate','Lowest rate']
    },
    }
  },
  computed: {
    getAverageRate() {
      const totalRates = this.reviews.reduce((sum, review) => sum + review.rate, 0);
      const averageRate = totalRates / this.reviews.length;
      return averageRate.toFixed(1)
    },
    getAverageRateRounded() {
      const averageRate = this.getAverageRate
      return Math.ceil(averageRate)
    }
  },
  async created() {
    // console.log(this.reviews);
    this.filteredReviews = this.reviews.slice(0, this.reviewsShown)
  },
  components: {
    ReviewPreview,
    ReviewRateBar,
    AddReview,
  },
  methods: {
    addReview(review) {
      // this.filteredReviews.unshift(review)
      this.reviews.unshift(review)
      this.filteredReviews = this.reviews
      console.log(this.reviews);
      this.toggleAddReviewInput()
    },
    toggleAddReviewInput() {
      this.addReviewInput = !this.addReviewInput
    },
    seeMore() {
      this.reviewsShown += this.reviewsToAdd
      this.filteredReviews = this.reviews.slice(0, this.reviewsShown)
    },
    searchReview() {
      console.log(this.searchTxt);
      const regex = new RegExp(this.searchTxt, 'i')
      this.filteredReviews = this.reviews.filter(review =>
        regex.test(review.txt) ||
        regex.test(review.by.fullname) ||
        regex.test(review.by.country) ||
        regex.test(review.rate))
    },
    setSort(by) {
      if(by === 'Highest rate') {
        this.filteredReviews.sort((a,b) => b.rate - a.rate)
      } else if(by === 'Lowest rate') {
        this.filteredReviews.sort((a,b) => a.rate - b.rate)
      } else if(by === 'Most recent') {
        this.filteredReviews.sort((a,b) => a.createdAt - b.createdAt)
      }
      this.sortBy.placeHolder = by
      this.sortBy.isOpen = false
    },
    openModal() {
      this.sortBy.isOpen = !this.sortBy.isOpen
    },
  },
}
</script>
<style lang=""></style>
  