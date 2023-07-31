<template>
	<div class="gig-preview-container">
		<div class="gig-preview">
			<div class="gig-preview__img-container">
				<p
					class="heart-icon"
					:class="{ 'heart-filled': isHeartFilled }"
					@click="toggleHeart"
				>
					♡
				</p>
				<GigPreviewCarousel
					:images="gig.imgUrls"
					@image-clicked="goToGig"
				></GigPreviewCarousel>
			</div>
			<div class="gig-preview__info">
				<div class="owner-preview-container">
					<img
						v-if="gig.owner?.imgUrl"
						class="gig-owner-img"
						:src="gig.owner?.imgUrl"
						alt="owner-image"
					/>
					<h3 class="gig-preview-owner">
						{{ gig.owner?.fullname }}
					</h3>
					<p class="gig-owner-level">{{ gig.owner?.level }}</p>
				</div>

				<h4 class="gig-preview__title" @click="goToGig">
					{{ gig.title }}
				</h4>
				<div class="preview-reviews-container">
					<p class="preview-star">★</p>
					<p v-if="gig.owner" class="gig-preview-rate">
						{{ avgRating }}
					</p>
					<p class="gig-reviews-num">({{ gig.reviews.length }})</p>
				</div>
				<div class="gig-preview-footer-container">
					<p v-if="gig.price" class="gig-preview__price">
						From <span>{{ gig.price }}$</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import GigPreviewCarousel from './GigPreviewCarousel.vue'

export default {
	data() {
		return {
			isHeartFilled: false,
		}
	},
	props: {
		gig: Object,
	},
	methods: {
		goToGig() {
			this.$router.push(`/explore/${this.gig._id}`)
		},
		toggleHeart() {
			this.isHeartFilled = !this.isHeartFilled
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
	components: {
		GigPreviewCarousel,
	},
}
</script>
