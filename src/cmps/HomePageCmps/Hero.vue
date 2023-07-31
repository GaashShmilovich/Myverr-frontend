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
      :pause-on-hover="false"
    >
      <vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :image="slide.image"
        :style="{ backgroundColor: slide.color }"
      >
        <template #content>
          <div class="info">
            <div class="info-pic">
              <img :src="pic[i].content" alt="pic" />
            </div>
            <div class="info-txt">
              <div class="fullname">
                <span>
                  {{ info.fullname[i] }}
                </span>
                <span class="stars">
                  5
                  <span class="svg" v-html="$getSvg('star')"></span>
                </span>
              </div>
              <p class="expert">{{ info.expert[i] }}</p>
            </div>
          </div>
        </template>
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
          color: "#0A4227",
        },
        {
          image:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/colin-2x.jpg",
          color: "#A74459",
        },
        {
          image:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/scarlett-2x.jpg",
          color: "#5F1629",
        },
        {
          image:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/jordan-2x.jpg",
          color: "#104A26",
        },
        {
          image:
            "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616497/christina-2x.jpg",
          color: "#AE3905",
        },
      ],
      pic: [
        {
          content:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499430/jenny-2x.png",
        },
        {
          content:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499432/colin-2x.png",
        },
        {
          content:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499428/scarlett-2x.png",
        },
        {
          content:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499439/jordan-2x.png",
        },
        {
          content:
            "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499422/christina-2x.png",
        },
      ],
      info: {
        fullname: [
          "Jenny",
          "colinstark",
          "Scarlett",
          "jordanruncie_",
          "Christina",
        ],
        expert: [
          "Children's voice over",
          "Creative director",
          "Business founder",
          "Production assistant",
          "Jewellery shop owner",
        ],
      },
    };
  },
  computed: {},
  methods: {},
};
</script>

<style>
.small-trans-div img {
  display: none;
}
.small-trans-div img.active {
  display: inline-block;
}
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
