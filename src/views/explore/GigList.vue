<template>
	<div>
		<h1>Gig List</h1>
		<ul>
			<li v-for="gig in gigs" :key="gig.id">
				<h1>{{ gig }}</h1>
			</li>
		</ul>
	</div>
</template>

<script>
import GigPreview from './GigPreview.vue'

export default {
	computed: {
		gigs() {
			return this.$store.state.gigStore.gigs
		},
	},
	components: {
		GigPreview,
	},
	props: {
		gigs: Array,
	},
}
</script>
