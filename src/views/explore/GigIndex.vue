<template>
	<div class="gig-list-container">
		<GigFilter></GigFilter>
		<GigList :gigs="gigs"></GigList>
	</div>
</template>

<script>
import GigList from './GigList.vue'
import GigFilter from './GigFilter.vue'

export default {
	data() {
		return {
			gigs: [],
		}
	},
	components: {
		GigList,
		GigFilter,
	},
	computed: {
		gigs() {
			return this.$store.state.gigStore.gigs
		},
	},
	created() {
		this.loadGigs()
	},
	methods: {
		loadGigs() {
			this.$store.dispatch({ type: 'loadGigs' })
		},
	},
}
</script>
