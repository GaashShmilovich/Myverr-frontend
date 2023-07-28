<template>
    <section class="about-the-seller">
        <img :src="gig.owner.imgUrl" alt="">
        <section class="details">
          <span class="name">{{ gig.owner.fullname }}</span>
          <span class="instagram">{{ gig.owner.instagram }}</span>
          <p class="moto">{{ gig.owner?.moto }}</p>

          <section class="gig-owner-rate">
            <span v-for="i in gig.owner.rate || 1">
              <font-awesome-icon :style="{ color: '#ffb33e' }" icon="fa-solid fa-star" />
            </span>
            <span class="rate-number" :style="{ color: '#ffb33e' }">{{ gig.owner.rate }} <span>(592)</span></span>
          </section>

          <button class="btn-contact">Contact Me</button>
        </section>
      </section>

        <section class="information">
          <section class="titles">
            <p class="1">From <br><span>USA</span> </p>
            <p class="2">Avg. response time <br><span>1 hour</span> </p>
            <p class="3">Languages <br><span>English</span> </p>
            <p class="4">Member since <br><span>Dec 2015</span> </p>
            <p class="5">Last delivery <br><span>1 day ago</span> </p>
          </section>
          <p class="text">Hello! I'm an enthusiastic and creative graphic artist who
            is passionate about Logo and Banner Design! And have many more skills!

            I'm a fun loving guy who loves nature, pets and dressing up! I'm also a bit of a perfectionist!

            I freelance exclusively on Fiverr!</p>
        </section>

</template>

<script>
export default {
    props: {
        gig: Object
    }
}
</script>