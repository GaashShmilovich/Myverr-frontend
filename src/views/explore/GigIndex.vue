<template>
	<div class="gig-list-container">
		<GigFilter></GigFilter>
		<GigList :gigs="gigs"></GigList>
	</div>
</template>

<script>
// import { mapState } from 'vuex'
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
		// ...mapState(['gigs']),
	},
	created() {
		this.loadGigs()
	},
	methods: {
		loadGigs() {
			this.$store.dispatch({ type: 'loadGigs' })
			const gigs = this.$store.getters.gigs
			this.gigs = gigs
		},
	},
}
</script>
