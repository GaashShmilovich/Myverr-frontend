<template lang="">
    <section class="reviews">
      <p class="title">Reviews</p> 

      <p class="sub-title">{{ reviews?.length }} reviews for this Gig
        <span v-for="i in reviews.rate || 1"> 
          <!-- // how to make average of review rates? -->
      <font-awesome-icon
        :style="{ color: '#ffb33e' }"
        icon="fa-solid fa-star"
      />
    </span>
  </p>

      <ReviewRateBar />

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

    <!-- <div>
      <p class="sortBy">Sort By <span class="place-holder" @click="openModal">{{ sortBy.placeHolder }}</span><span :class="{ 'arrow-up': sortBy.isOpen, 'arrow-down': !sortBy.isOpen }" v-html="$getSvg('arrow-down')"  @click="openModal"></span></p>  
      <p class="sortByModal" :class="{'hidden': !sortBy.isOpen}">
      <a v-for="type in sortBy.types" @click="setSort(`${type}`)"><i :class="{'hidden': sortBy.placeHolder !== `${type}`}" class="v-check" v-html="$getSvg('v-check')"></i>{{type}}</a>
      </p>
    </div> -->

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
  </template>
<script>
import ReviewPreview from './ReviewPreview.vue'
import ReviewRateBar from './ReviewRateBar.vue'
export default {
  props: {
    reviews: Array,
    
  },
  data() {
    return {
      searchTxt: '',
      filteredReviews: [],
      sortBy: {
      isOpen: false,
      placeHolder: 'Most recent',
      types: ['Most recent','Highest rate','Lowest rate']
    },
    }
  },
  async created() {
    console.log(this.reviews);
    this.filteredReviews = this.reviews
  },
  components: {
    ReviewPreview,
    ReviewRateBar,
  },
  methods: {
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
    }
  },
}
</script>
<style lang=""></style>
  