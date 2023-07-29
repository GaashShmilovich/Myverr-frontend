<template>
  <section class="best-part-container">
    <div class="selling-text">
      <h2>The best part? Everything.</h2>
      <ul>
        <li>
          <h6>
            <span class="v-sign" v-html="$getSvg('v-for-home')"> </span>Stick to
            your budget
          </h6>
          <p>
            Find the right service for every price point. No hourly rates, just
            project-based pricing.
          </p>
        </li>
        <li>
          <h6>
            <span class="v-sign" v-html="$getSvg('v-for-home')"> </span>
            Get quality work done quickly
          </h6>
          <p>
            Hand your project over to a talented freelancer in minutes, get
            long-lasting results.
          </p>
        </li>
        <li>
          <h6>
            <span class="v-sign" v-html="$getSvg('v-for-home')"> </span>
            Pay when you're happy
          </h6>
          <p>
            Upfront quotes mean no surprises. Payments only get released when
            you approve.
          </p>
        </li>
        <li>
          <h6>
            <span class="v-sign" v-html="$getSvg('v-for-home')"> </span>
            Count on 24/7 support
          </h6>
          <p>
            Our round-the-clock support team is available to help anytime,
            anywhere.
          </p>
        </li>
      </ul>
    </div>
    <div class="selling-video">
      <img
        src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_900,dpr_2.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png"
        alt="selling video"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "best-part",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>
