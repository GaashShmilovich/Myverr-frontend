<template>
	<div>
		<ul class="gig-list">
			<li v-for="gig in gigs" :key="gig.id">
				<GigPreview :gig="gig"></GigPreview>
			</li>
		</ul>
	</div>
</template>

<script>
import GigPreview from './GigPreview.vue'

export default {
	computed: {},
	components: {
		GigPreview,
	},
	props: {
		gigs: Array,
	},
}
</script>
