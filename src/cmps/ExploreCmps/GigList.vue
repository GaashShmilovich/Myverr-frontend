<template>
	<section class="gig-list-container">
		<Loader v-if="isLoading && !gigs.length"></Loader>
		<div class="gig-list" v-if="gigs.length">
			<GigPreview
				v-for="gig in gigs"
				:key="gig.id"
				:gig="gig"
				ref="gigPreview"
			></GigPreview>
		</div>
		<div v-if="!gigs.length && !isLoading">
			No gigs found, try to search again.
		</div>
	</section>
</template>

<script>
import GigPreview from './GigPreview.vue'
import Loader from '../Loader.vue'

export default {
	components: {
		GigPreview,
		Loader,
	},
	props: {
		gigs: Array,
	},
	data() {
		return {
			isLoading: true, // To determine if we're still in the loading phase
		}
	},
	mounted() {
		// Check for gigs after 4 seconds
		setTimeout(() => {
			this.isLoading = false
		}, 4000)
	},
	methods: {
		toggleGigSlideshow() {
			this.$refs.gigPreview.toggleSlideshow()
		},
	},
}
</script>
