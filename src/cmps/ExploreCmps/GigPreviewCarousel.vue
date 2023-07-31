<template>
	<vueper-slides
		class="preview-carousel-img"
		v-if="images && images.length"
		:disable="slideshowDisabled"
		disable-arrows-on-edges
		:touchable="false"
	>
		<vueper-slide v-for="image in images" :key="image">
			<template v-slot:content>
				<img
					@click="$emit('image-clicked')"
					:src="image"
					alt="Gig image"
				/>
			</template>
		</vueper-slide>
	</vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'

export default {
	components: {
		VueperSlides,
		VueperSlide,
	},
	props: {
		images: Array,
	},
	data() {
		return {
			slideshowDisabled: false,
			heartActive: false,
		}
	},
	methods: {
		toggleSlideshow() {
			this.slideshowDisabled = !this.slideshowDisabled
		},
		toggleHeart() {
			this.heartActive = !this.heartActive
		},
	},
}
</script>
