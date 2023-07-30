<template>
  <section class="hero-container">
    <vueper-slides
      ref="vueperslides1"
      :touchable="false"
      fade
      :autoplay="true"
      :bullets="false"
      :arrows="false"
      fixed-height="680px"
    >
      <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image">
      </vueper-slide>
    </vueper-slides>
    <InsideHeroSearch />
  </section>
</template>
<script>
import InsideHeroSearch from "./insideHeroSearch.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "hero",
  components: {
    InsideHeroSearch,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      slides: [
        {
          image:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/jenny-2x.jpg",
        },
        {
          image:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/colin-2x.jpg",
        },
        {
          image:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/scarlett-2x.jpg",
        },
        {
          image:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/jordan-2x.jpg",
        },
        {
          image:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616497/christina-2x.jpg",
        },
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
    // setInterval(this.rotateImages, 3500);
  },
};
</script>

<style>
/* .thumbnails {
  margin: auto;
  max-width: 300px;
} */

/* .thumbnails .vueperslide {
  box-sizing: border-box;
  border: 1px solid #fff;
  transition: 0.3s ease-in-out;
  opacity: 0.7;
  cursor: pointer;
}

.thumbnails .vueperslide--active {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  opacity: 1;
  border-color: #000;
} */
</style>
