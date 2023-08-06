<template>
	<div class="gig-preview-container">
		<div class="gig-preview">
			<div class="gig-preview__img-container">
				<p
    class="heart-icon"
    :class="{ 'heart-filled': isHeartFilled, 'heart-modal-show': isHeartFilled }"
    @click="toggleHeart"
>
    <i v-if="gigFavorite" class="favorite-icon" v-html="$getSvg('heart-filled')"></i>
    <i v-else class="empty-heart" v-html="$getSvg('heart')"></i>

    <div class="heart-modal">
		<p class="heart-modal-text" @click="toggleModal">
                    {{ gigFavorite ? 'Remove from list' : 'Save to list' }}
                </p>        <p class="speach-bubble-modal"></p>
    </div>
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
					<p class="preview-star"><i v-html="$getSvg('rate-star')"></i></p>
					<p v-if="gig.owner" class="gig-preview-rate">
						{{ avgRating }}
					</p>
					<p class="gig-reviews-num">({{ gig.reviews.length }})</p>
				</div>
				<div class="gig-preview-footer-container">
					<p v-if="gig.price" class="gig-preview__price">
						From <span>${{ gig.price }}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
	<div v-if="isModalVisible" @click="toggleModal" class="saved-modal">
        {{ gigFavorite ? 'The item saved in list 12' : 'Removed item from list 12' }}
    </div>
</template>

<script>
import GigPreviewCarousel from './GigPreviewCarousel.vue'
import { getSvg } from '../../services/svg.service.js'

export default {
	data() {
		return {
			isHeartFilled: false,
			isModalVisible: false,
			gigFavorite: false,
			favoriteGigs: [],
		}
	},
	props: {
		gig: Object,
	},
	methods: {
		isGigInFavorites() {
			return this.favoriteGigs.includes(this.gig._id)
		},
		goToGig() {
			this.$router.push(`/explore/${this.gig._id}`)
		},
		toggleHeart() {
			this.isHeartFilled = !this.isHeartFilled
		},
		toggleModal() {
      this.isModalVisible = !this.isModalVisible;
	  const gigId = this.gig._id
			if (this.isHeartFilled) {
				if (!this.favoriteGigs.includes(gigId)){
					this.favoriteGigs.push(gigId)
					this.gigFavorite = true
				}
			} else {
				const index = this.favoriteGigs.indexOf(gigId)
				this.gigFavorite = false
				if (index > -1) this.favoriteGigs.splice(index, 1)
			}
	  
	  setTimeout(() => {
		this.isModalVisible = !this.isModalVisible;
	  }, 3500);
    },
	},
	computed: {
		avgRating() {
			if (!this.gig.reviews.length) return 0
			const totalRating = this.gig.reviews.reduce((acc, review) => {
				return acc + review.rate
			}, 0)
			return (totalRating / this.gig.reviews.length).toFixed(1)
		},
	},
	components: {
		GigPreviewCarousel,
	},
}
</script>
