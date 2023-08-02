<template>
  <div class="login-signin">
    <div class="img-container">
    <img src="https://fiverr-res.cloudinary.com/npm-assets/layout-server/standard.c6d3ba7.png" alt="">
    <div class="txt">
    <p class="title">Success starts here</p>
    <p><i v-html="$getSvg('v-check-white')"></i> Over 600 categories</p>
    <p><i v-html="$getSvg('v-check-white')"></i> Pay per project, not per hour</p>
    <p><i v-html="$getSvg('v-check-white')"></i> Access to talent and businesses <br> <span>across the globe</span></p>
    </div>
    </div>

    <div class="login">
      <p class="title">Sign in to your account</p>
      <p class="sub-title">Don’t have an account? <span @click="doSignup">Join here</span> </p>
      <!-- <p class="mobile-title">fiverr <span>.</span></p> -->
      <p class="mobile-title"><i v-html="$getSvg('fiverr-logo')"></i>
        <!-- <i v-html="$getSvg('x')"></i> -->
      </p>
      <p class="mobile-sub-title">Success <span>starts</span> here.</p>
      <button class="ggl" @click="doLogin"><i v-html="$getSvg('google')">
      </i>Continue with Google</button>
      <button class="username" @click="loginByUsername"><i v-html="$getSvg('email')"></i>
        Continue with email/username</button>
      <p class="or">OR</p>
      <section class="social-media">
      <button class="apl" @click="doLogin"><i v-html="$getSvg('apple')"></i>
        Apple</button>
      <button class="fbk" @click="doLogin"><i v-html="$getSvg('facebook')"></i>
        Facebook</button>
        <p class="mobile-footer">By joining, you agree to the Fiverr <span>Terms of Service</span> and to <br/>occasionally receive emails from us. Please read our <br/><span>Privacy Policy</span> to learn how we use your personal data.</p>
    </section>
      
      
      <div v-if="byUsername" class="username-login">
        <button @click="loginByUsername" class="back"><i v-html="$getSvg('long-arrow-left')"></i> Back</button>
        <p class="title">Continue with your email or username</p>
          <p class="input-title">Email or username</p>
          <input
          type="text"
          v-model="loginCred.username"
        />
        <p class="input-title">Password</p>
          <input
          type="text"
          v-model="loginCred.password"
        />
        <button class="btn-continue" @click="doLogin">Sign in</button>
        
      </div>

      <div>
      <!-- <p class="mute">user1 or admin, pass:123</p>
      <form @submit.prevent="doSignup">
        <h2>Signup</h2>
        <input
          type="text"
          v-model="signupCred.fullname"
          placeholder="Your full name"
        />
        <input
          type="text"
          v-model="signupCred.username"
          placeholder="Username"
        />
        <input
          type="password"
          v-model="signupCred.password"
          placeholder="Password"
        /> 
     <ImgUploader @uploaded="onUploaded" /> -->
      <!-- <button>Signup</button>
      </form>
    </div>
    <hr />
      <details>
      <summary>
        Admin Section
      </summary>
      <h3 v-if="isLoading">Loading...</h3>
      <ul v-else>
        <li v-for="user in users" :key="user._id">
          <pre>{{ user }}</pre>
          <button @click="removeUser(user._id)">x</button>
        </li>
      </ul>
    </details> -->
    </div>
    </div>

  </div>

  <div class="login-backdrop"></div>
</template>

<script>
import ImgUploader from "../cmps/ImgUploader.vue";

export default {
  name: "login-signup",
  data() {
    return {
      msg: "",
      loginCred: { username: "user1", password: "123" },
      signupCred: {
        username: "user1",
        password: "123",
        fullname: "User 1",
        imgUrl: "",
      },
      byUsername: false,
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    isLoading() {
      return this.$store.getters.usersIsLoading;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
    this.loadUsers();
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password";
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        console.log("user loged in");
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.msg = "Failed to login";
      }
    },
    loginByUsername() {
      this.byUsername = !this.byUsername
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.msg = "Please fill up the form";
        return;
      }
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      this.$router.push("/");
    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" });
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId });
        this.msg = "User removed";
      } catch (err) {
        this.msg = "Failed to remove user";
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl;
    },
  },
  components: {
    ImgUploader,
  },
};
</script>
