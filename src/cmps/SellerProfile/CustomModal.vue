<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-status">
      <h2>Change Order Status</h2>
      <div class="modal-buttons">
        <button class="complete" @click="changeStatus('complete')">
          Complete
        </button>
        <button class="reject" @click="changeStatus('reject')">Reject</button>
        <button class="cancel" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    order: Object,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    changeStatus(status) {
      this.$emit("change-status", status);
      this.closeModal();
    },
  },
};
</script>
