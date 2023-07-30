<template>
  <section class="hero-container">
    <img
      v-if="currentImage"
      ref="rotatingImage"
      alt="Vue logo"
      :src="currentImage"
      :key="currentImageIndex"
      class="image-transition"
    />
    <div class="inside-hero-search-wrapper full main-layout">
      <InsideHeroSearch />
    </div>
  </section>
</template>

<script>
import InsideHeroSearch from "./insideHeroSearch.vue";

export default {
  name: "hero",
  components: { InsideHeroSearch },
  data() {
    return {
      images: [
        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/1b6990afe0934244dda2c9aeed5de8d9-1674663021930/bg-hero-6-1792-x1.png",
        "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049983/bg-hero-1-1792-x1.png",
        "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/2413b8415dda9dbd7756d02cb87cd4b1-1599595203045/bg-hero-2-1792-x1.png",
        "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/d14871e2d118f46db2c18ad882619ea8-1599835783966/bg-hero-3-1792-x1.png",
        "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/93085acc959671e9e9e77f3ca8147f82-1599427734108/bg-hero-4-1792-x1.png",
        "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049970/bg-hero-5-1792-x1.png",
      ],
      currentImageIndex: 0,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
  },
  methods: {
    rotateImages() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
    },
  },
  mounted() {
    setInterval(this.rotateImages, 3500);
  },
};
</script>
