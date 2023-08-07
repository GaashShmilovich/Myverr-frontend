<template>
    <section class="about-the-seller">
        <img :src="gig.owner.imgUrl" alt="">
        <section class="details">
          <span class="name">{{ gig.owner.fullname }}</span>
          <span class="instagram">{{ gig.owner.instagram }}</span>
          <p class="moto">{{ gig.owner?.moto }}</p>

          <section class="gig-owner-rate">
            <span v-for="i in Math.ceil(gig.owner.rate) || 1">
              <font-awesome-icon class="star yellow" icon="fa-solid fa-star" />
            </span>
            <span class="rate-number yellow">{{ gig.owner.rate }}</span> <span>({{ gig.reviews.length }})</span>
          </section>

          <button class="btn-contact">Contact Me</button>
        </section>
      </section>

        <section class="information">
          <section class="titles">
            <p class="1">From <br><span>{{ gig.owner.country }}</span> </p>
            <p class="2">Avg. response time <br><span>{{ gig.owner.averageResponse }}</span> </p>
            <p class="3">Languages <br><span>{{ gig.owner.language.join(', ') }}</span> </p>
            <p class="4">Member since <br><span>{{ gig.owner.since }}</span> </p>
            <p class="5">Last delivery <br><span>{{ gig.owner.lastDelivery }}</span> </p>
          </section>
          <p class="text">{{ gig.owner.about }}</p>
        </section>

</template>

<script>
export default {
    props: {
        gig: Object
    },
    computed: {
        getLanguages() {

        }
    }
}
</script>