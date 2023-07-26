<template>
    <div class="pagination">
      <button
        class="pagination__button"
        :class="{ 'pagination__button--disabled': currentPage === 1 }"
        @click="previousPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <span class="pagination__text">{{ currentPage }} / {{ totalPages }}</span>
      <button
        class="pagination__button"
        :class="{ 'pagination__button--disabled': currentPage === totalPages }"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      totalItems: {
        type: Number,
        required: true
      },
      itemsPerPage: {
        type: Number,
        default: 10
      }
    },
    data() {
      return {
        currentPage: 1
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage)
      }
    },
    methods: {
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
  
  .pagination__button {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #333;
    cursor: pointer;
    font-size: 1rem;
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease-in-out;
  }
  
  .pagination__button:hover:not(.pagination__button--disabled) {
    background-color: #f5f5f5;
    border-color: #999;
  }
  
  .pagination__button--disabled {
    background-color: #f5f5f5;
    border-color: #ccc;
    color: #999;
    cursor: not-allowed;
  }
  
  .pagination__text {
    font-size: 1rem;
    margin: 0 0.5rem;
  }
  </style>