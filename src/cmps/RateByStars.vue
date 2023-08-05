<template>
    <div class="star-rating">
      <span
        v-for="star in 5"
        :key="star"
        @click="rate(star)"
        :class="{ 'filled-star': star <= selectedRating, 'empty-star': star > selectedRating }"
      >
      <font-awesome-icon
          
          icon="fa-solid fa-star"
          />
      </span>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedRating: 0,
      };
    },
    methods: {
      rate(rating) {
        this.selectedRating = rating;
        this.$emit('input', rating); // Emit the selected rating to the parent component
      },
    },
  };
  </script>
  
  <style>
  /* .star-rating {
    font-size: 22px;
    cursor: pointer;
    
  }
  
  .filled-star {
    color: gold;
    &:hover {
        color: orange;
    }
  }
  
  .empty-star {
    color: #ccc;
    &:hover {
        color: orange;
    }
  } */
  </style>