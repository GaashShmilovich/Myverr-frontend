<template>
  <div>
    <ul class="gig-list">
      <li v-for="gig in gigs" :key="gig.id">
        <GigPreview :gig="gig" @delete="removeGig" @edit="editGig"></GigPreview>
      </li>
    </ul>
  </div>
</template>

<script>
import GigPreview from "./GigPreviewSeller.vue";

export default {
  components: {
    GigPreview,
  },
  props: {
    gigs: Array,
  },
  methods: {
    removeGig(gig) {
      this.$emit("remove-gig", gig);
    },
    editGig(gig) {
      this.$emit("edit-gig", gig);
    },
  },
};
</script>
