<template>
  <section class="gig-details-carusela">
    <vueper-slides ref="vueperslides1" class="container" :touchable="false" fade :autoplay="false" :bullets="false"
      @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })">
      <vueper-slide class="big-img" v-for="(slide, i) in slides" :key="i" :image="slide.image">
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
      <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image"
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
      slides: [
        { image: this.gig.imgUrls[0] },
        { image: 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/86f818eae5827fb14a0e173f5dec8d7c-1690012278/texas-gun-runners/design-clean-and-responsive-wordpress-website.jpg' },
        { image: 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/d89245dc082181e053fb71cb68b85ad8-1690021556/Screenshot%202023-07-22%20at%2015-25-06%20Miro%20Wittwer/design-clean-and-responsive-wordpress-website.png' },
        { image: 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/8660a9c07ee72ed3bd97784e08a596a1-1688751024/david-cavill/design-clean-and-responsive-wordpress-website.jpg' }
      ]
    }
  },

  props: {
    gig: Object
  }
}
</script>

<style>

</style>