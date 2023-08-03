<template>
    <div class="login-signin">
        <div class="img-container">
            <img src="https://fiverr-res.cloudinary.com/npm-assets/layout-server/standard.c6d3ba7.png" alt="">
            <div class="txt">
                <p class="title">Success starts here</p>
                <p><i v-html="$getSvg('v-check-white')"></i> Over 600 categories</p>
                <p><i v-html="$getSvg('v-check-white')"></i> Pay per project, not per hour</p>
                <p><i v-html="$getSvg('v-check-white')"></i> Access to talent and businesses <br> <span>across the
                        globe</span></p>
            </div>
        </div>

        <div class="login">
            <p class="title">Sign in to your account</p>
            <p class="sub-title">Already have an account? <RouterLink :to="'/login'">Sign in</RouterLink>
            </p>
            <p class="mobile-title"><i v-html="$getSvg('fiverr-logo')"></i>
            </p>
            <p class="mobile-sub-title">Success <span>starts</span> here.</p>
            <button class="ggl" @click="signupByUsername"><i v-html="$getSvg('google')">
                </i>Continue with Google</button>
            <button class="username" @click="signupByUsername"><i v-html="$getSvg('email')"></i>
                Continue with email/username</button>
            <p class="or">OR</p>
            <section class="social-media">
                <button class="apl" @click="signupByUsername"><i v-html="$getSvg('apple')"></i>
                    Apple</button>
                <button class="fbk" @click="signupByUsername"><i v-html="$getSvg('facebook-blue')"></i>
                    Facebook</button>
                <p class="mobile-footer">By joining, you agree to the Fiverr <span>Terms of Service</span> and to
                    <br />occasionally receive emails from us. Please read our <br /><span>Privacy Policy</span> to learn
                    how we use your personal data.</p>
            </section>


            <div v-if="byUsername" class="username-login">
                <button @click="signupByUsername" class="back"><i v-html="$getSvg('long-arrow-left')"></i> Back</button>
                <p class="title">Continue with your email or username</p>
                <p class="input-title">Email</p>
                <input type="text" v-model="signupCred.email" placeholder="name@email.com" />
                <p class="input-title">Password</p>
                <input type="text" v-model="signupCred.password" />
                <button class="btn-continue" @click="doSignup">Sign in</button>

            </div>
            <div>

            </div>
        </div>

    </div>

    <div class="login-backdrop"></div>
</template>


<script>
import ImgUploader from "../cmps/ImgUploader.vue";

export default {
    name: "signup",
    data() {
        return {
            signupCred: {
                email: 'giora@gmail.com',
                password: "****",
                // imgUrl: "",
            },
            byUsername: false,
        };
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        },
    },
    methods: {

        signupByUsername() {
            this.byUsername = !this.byUsername
        },
        async doSignup() {
            
            await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
            this.$router.push("/");
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
