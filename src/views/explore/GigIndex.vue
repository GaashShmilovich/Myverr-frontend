<template>
	<div class="gig-list-container">
		<GigList :gigs="gigs"></GigList>
	</div>
</template>

<script>
import { mapState } from 'vuex'
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
		...mapState(['gigs']),
	},
	created() {
		this.$store.dispatch({ type: 'loadGigs' })
		this.loadGigs()
		console.log(this.gigs)
	},
	methods: {
		loadGigs() {
			const gigs = this.$store.getters.gigs
			this.gigs = gigs
			console.log('gigs', gigs)
		},
	},
}
</script>
