<template>
	<header
		ref="header"
		class="full main-layout app-header"
		:class="{
			openHeader: isFirstNavShown,
			'main-layout': isFirstNavShown,
			'is-sticky': isSticky,
		}"
	>
		<div
			class="nav-container full main-layout"
			:class="{
				'open-nav-border': isFirstNavShown,
				'is-sticky': isSticky,
			}"
		>
			<nav>
				<RouterLink to="/">
					<div
						class="logo"
						:class="{
							'open-nav-logo': isFirstNavShown,
							'is-sticky': isSticky,
						}"
					>
						Myverr <span>.</span>
					</div>
				</RouterLink>
				<div
					class="search"
					:class="{
						hidden: isHidden,
						shown: modalOpen,
					}"
				>
					<SearchBar
						placeholder="What services are you looking for today?"
					/>
				</div>
				<div
					class="route-container full"
					:class="{
						'open-nav-links': isFirstNavShown,
						'is-sticky': isSticky,
					}"
				>
					<!-- <RouterLink to="/login">Become a Seller</RouterLink> -->
					<div class="logged-user" v-if="loggedInUser">
						<RouterLink class="explore" to="/explore"
							>Explore</RouterLink
						>
						<div class="profile-menu-wrapper">
							<img
								class="profile-menu"
								:src="loggedInUser?.imgUrl"
								alt=""
								@click="toggleProfileMenu"
							/>
							<ProfileMenu
								v-if="isProfileMenuOpen"
								:loggedInUser="loggedInUser"
								:isMenuOpen="isProfileMenuOpen"
							></ProfileMenu>
						</div>
					</div>
					<div class="sign-join" v-else>
						<RouterLink class="explore" to="/explore"
							>Explore</RouterLink
						>
						<RouterLink class="signin" to="/login"
							>Sign in</RouterLink
						>
						<RouterLink to="/login"><span>Join</span></RouterLink>
					</div>
				</div>
			</nav>
		</div>
		<nav
			class="categories full main-layout"
			:class="{
				hidden: isHidden,
				shown: modalOpen,
			}"
		>
			<ul class="category-container main-layout">
				<li>
					<a @click="navigateToExplore('Graphics & Design')"
						>Graphics & Design</a
					>
				</li>
				<li>
					<a @click="navigateToExplore('Programming & Tech')"
						>Programming & Tech</a
					>
				</li>
				<li>
					<a @click="navigateToExplore('Digital Marketing')"
						>Digital Marketing</a
					>
				</li>
				<li>
					<a @click="navigateToExplore('Video & Animation')"
						>Video & Animation</a
					>
				</li>
				<li>
					<a @click="navigateToExplore('Writing & Translation')"
						>Writing & Translation</a
					>
				</li>
				<li>
					<a @click="navigateToExplore('Music & Audio')"
						>Music & Audio</a
					>
				</li>
				<li><a @click="navigateToExplore('Business')">Business</a></li>
				<li><a @click="navigateToExplore('Data')">Data</a></li>
				<li>
					<a @click="navigateToExplore('Photography')">Photography</a>
				</li>
				<li>
					<a @click="navigateToExplore('AI Services')">AI Services</a>
				</li>
			</ul>
		</nav>
	</header>
</template>
<script>
import SearchBar from './SearchBar.vue'
import ProfileMenu from './ProfileMenu.vue'
// import { userService } from '../../services/user.service.local.js'
import { userService } from '../../services/user.service.js'
export default {
	data() {
		return {
			user: null,
			isFirstNavShown: false,
			modalOpen: false,
			isHidden: true,
			isSticky: true,
			isProfileMenuOpen: false,

			categories: {
				'Graphics & Design': 'Logo-Design',
				'Programming & Tech': 'Web-Applications',
				'Digital Marketing': 'Video-Marketing',
				'Video & Animation': 'Logo-Animation',
				'Writing & Translation': 'Book-Editing',
				'Music & Audio': 'Voice-Over',
				Business: 'Sales',
				Data: 'Data-Entry',
				Photography: 'Product-Photographers',
				'AI Service': 'AI-Applications',
			},
		}
	},
	methods: {
		navigateToExplore(category) {
			const subCategory = this.categories[category]
			this.$router.push({
				path: '/explore',
				query: { category, subCategory },
			})
		},
		toggleProfileMenu() {
			this.isProfileMenuOpen = !this.isProfileMenuOpen
		},

		onScroll(e) {
			if (window.scrollY < 10) this.isFirstNavShown = false
			if (window.scrollY > 10) {
				this.isFirstNavShown = true
				this.isSticky = true
			}
			if (window.scrollY < 160) {
				this.modalOpen = false
				this.isHidden = true
			}
			if (window.scrollY > 160) {
				this.modalOpen = true
				this.isHidden = false
				this.isSticky = true
			}

			if (this.$route.path !== '/') {
				this.isFirstNavShown = true
				this.modalOpen = true
				this.isHidden = false
				this.isSticky = false
			}
		},
	},
	computed: {
		currRoutePath() {
			return this.$route.path
		},
		loggedInUser() {
			console.log(this.$store.getters.loggedinUser)
			return this.$store.getters.loggedinUser
		},
	},

	created() {
		window.addEventListener('scroll', this.onScroll)
		this.user = userService.getLoggedinUser()
	},

	unmounted() {
		window.removeEventListener('scroll', this.onScroll)
	},
	watch: {
		$route(to) {
			if (to.path === '/') {
				this.isFirstNavShown = false
				this.modalOpen = false
				this.isHidden = true
			}
			if (to.path !== '/') {
				this.isFirstNavShown = true
				this.modalOpen = true
				this.isHidden = false
				this.isSticky = false
			}
		},
	},
	components: {
		SearchBar,
		ProfileMenu,
	},
}
</script>
