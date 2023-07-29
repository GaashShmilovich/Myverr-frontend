<template>
	<div class="gig-preview-container" @click="goToGig">
		<div class="gig-preview">
			<div class="gig-preview__img-container">
				<img
					v-if="gig?.imgUrls"
					:src="gig?.imgUrls"
					alt="gig.title"
					class="gig-preview__img"
				/>
			</div>
			<div class="gig-preview__info">
				<div class="owner-preview-container">
					<img
						v-if="gig.owner?.imgUrl"
						class="gig-owner-img"
						:src="gig.owner?.imgUrl"
						alt="owner-image"
					/>
					<h3 v-if="gig.owner?.fullname" class="gig-preview-owner">
						{{ gig.owner?.fullname }}<br /><span>{{
							gig.owner.level
						}}</span>
					</h3>
				</div>
				<h4 class="gig-preview__title">{{ gig.title }}</h4>
				<p v-if="gig.owner" class="gig-preview-rate">
					⭐ {{ avgRating }}
					<span>({{ gig.reviews.length }})</span>
				</p>
				<hr />
				<div class="gig-preview-footer-container">
					<p class="gig-like-btn">❤</p>
					<p v-if="gig.price" class="gig-preview__price">
						Starting at <br /><span>{{ gig.price }}$</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		gig: Object,
	},
	methods: {
		goToGig() {
			this.$router.push(`/explore/${this.gig._id}`)
		},
	},
	computed: {
		avgRating() {
			if (!this.gig.reviews.length) return 0
			const totalRating = this.gig.reviews.reduce((acc, review) => {
				return acc + review.rate
			}, 0)
			return (totalRating / this.gig.reviews.length).toFixed(2)
		},
	},
}
</script>
