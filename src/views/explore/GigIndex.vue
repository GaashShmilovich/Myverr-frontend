<template>
	<div class="gig-list-container">
		<GigList :gigs="gigs"></GigList>
	</div>
</template>

<script>
// import { mapState } from 'vuex'
import GigList from './GigList.vue'

export default {
	data() {
		return {
			gigs: [],
		}
	},
	components: {
		GigList,
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
