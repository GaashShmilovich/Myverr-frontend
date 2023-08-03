<template>
	<div class="login-signin">
		<div class="img-container">
			<img
				src="https://fiverr-res.cloudinary.com/npm-assets/layout-server/standard.c6d3ba7.png"
				alt=""
			/>
			<div class="txt">
				<p class="title">Success starts here</p>
				<p>
					<i v-html="$getSvg('v-check-white')"></i> Over 600
					categories
				</p>
				<p>
					<i v-html="$getSvg('v-check-white')"></i> Pay per project,
					not per hour
				</p>
				<p>
					<i v-html="$getSvg('v-check-white')"></i> Access to talent
					and businesses <br />
					<span>across the globe</span>
				</p>
			</div>
		</div>

		<div class="login">
			<p class="title">Sign in to your account</p>
			<p class="sub-title">
				Don’t have an account?
				<RouterLink :to="'/signup'">Join here</RouterLink>
			</p>
			<!-- <p v-else class="sub-title">Already have an account?<span @click="typeAction">Sign in</span> </p> -->
			<p class="mobile-title"><i v-html="$getSvg('fiverr-logo')"></i></p>
			<p class="mobile-sub-title">Success <span>starts</span> here.</p>
			<button class="ggl" @click="doLogin">
				<i v-html="$getSvg('google')"> </i>Continue with Google
			</button>
			<button class="username" @click="loginByUsername">
				<i v-html="$getSvg('email')"></i> Continue with email/username
			</button>
			<p class="or">OR</p>
			<section class="social-media">
				<button class="apl" @click="doLogin">
					<i v-html="$getSvg('apple')"></i> Apple
				</button>
				<button class="fbk" @click="doLogin">
					<i v-html="$getSvg('facebook-blue')"></i> Facebook
				</button>
				<p class="mobile-footer">
					By joining, you agree to the Fiverr
					<span>Terms of Service</span> and to <br />occasionally
					receive emails from us. Please read our <br /><span
						>Privacy Policy</span
					>
					to learn how we use your personal data.
				</p>
			</section>

			<div v-if="byUsername" class="username-login">
				<button @click="loginByUsername" class="back">
					<i v-html="$getSvg('long-arrow-left')"></i> Back
				</button>
				<p class="title">Continue with your email or username</p>
				<p class="input-title">Email or username</p>
				<input type="text" v-model="loginCred.username" />
				<p class="input-title">Password</p>
				<input type="text" v-model="loginCred.password" />
				<button class="btn-continue" @click="doLogin">Sign in</button>
			</div>
			<div></div>
		</div>
	</div>

	<div class="login-backdrop"></div>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			loginCred: { username: 'gaash', password: 'gaash' },
			byUsername: false,
		}
	},
	computed: {
		users() {
			return this.$store.getters.users
		},
		isLoading() {
			return this.$store.getters.usersIsLoading
		},
		loggedinUser() {
			return this.$store.getters.loggedinUser
		},
	},
	created() {
		this.loadUsers()
	},
	methods: {
		async doLogin() {
			if (!this.loginCred.username) {
				this.msg = 'Please enter username/password'
				return
			}
			try {
				await this.$store.dispatch({
					type: 'login',
					userCred: this.loginCred,
				})
				console.log('user loged in')
				this.$router.push('/')
			} catch (err) {
				console.log(err)
				this.msg = 'Failed to login'
			}
		},
		loginByUsername() {
			this.byUsername = !this.byUsername
		},
		doLogout() {
			this.$store.dispatch({ type: 'logout' })
		},

		loadUsers() {
			this.$store.dispatch({ type: 'loadUsers' })
		},
	},
}
</script>
