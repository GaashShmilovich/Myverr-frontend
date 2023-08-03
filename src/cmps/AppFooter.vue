<template>
  <footer>
    <div class="footer-container">
      <div class="left">
        <span class="logo">Myverr<span>&reg</span></span>
        <p><span>&copy Myverr International Ltd. 2023</span></p>
      </div>
      <div class="right">
        <ul class="social">
          <li><i class="search" v-html="$getSvg('twitter')"></i></li>
          <li><i class="search" v-html="$getSvg('facebook')"></i></li>
          <li><i class="search" v-html="$getSvg('linkedin')"></i></li>
          <li><i class="search" v-html="$getSvg('pinterest')"></i></li>
          <li><i class="search" v-html="$getSvg('instagram')"></i></li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  computed: {},
};
</script>
