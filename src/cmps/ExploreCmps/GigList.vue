<template>
	<div>
		<ul class="gig-list">
			<li v-for="gig in gigs" :key="gig.id">
				<GigPreview :gig="gig" ref="gigPreview"></GigPreview>
			</li>
		</ul>
	</div>
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
