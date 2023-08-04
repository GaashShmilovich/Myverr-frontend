<template>
	<section class="gig-list-container">
		<div class="gig-list">
			<GigPreview
				v-for="gig in gigs"
				:key="gig.id"
				:gig="gig"
				ref="gigPreview"
			></GigPreview>
		</div>
	</section>
</template>

<script>
import GigPreview from './GigPreview.vue'

export default {
	components: {
		GigPreview,
	},
	props: {
		gigs: Array,
	},
	methods: {
		toggleGigSlideshow() {
			this.$refs.gigPreview.toggleSlideshow()
		},
	},
}
</script>
