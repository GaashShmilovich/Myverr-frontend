<template>
  <section class="gig-details-carusela">
    <vueper-slides ref="vueperslides1" class="container" :touchable="false" fade :autoplay="false" :bullets="false"
      @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })">
      <vueper-slide class="big-img" v-for="(slide, i) in gig.imgUrls" :key="i" :image="slide">
      </vueper-slide>
    </vueper-slides>

    <vueper-slides class="no-shadow thumbnails" ref="vueperslides2"
      @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })" :visible-slides="slides.length"
      fixed-height="75px" :infinite="false" :bullets="false" :touchable="false" :gap="2.5" :arrows="true">
      <template #arrow-left>
    <i class="icon icon-arrow-left" />
  </template>

  <template #arrow-right>
    <i class="icon icon-arrow-right" />
  </template>
      <vueper-slide v-for="(slide, i) in gig.imgUrls" :key="i" :image="slide"
        @click.native="$refs.vueperslides2.goToSlide(i)">
      </vueper-slide>
    </vueper-slides>
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      slides: this.gig.imgUrls
    }
  },

  props: {
    gig: Object
  },
  created() {
  },
}
</script>

<style>

</style>