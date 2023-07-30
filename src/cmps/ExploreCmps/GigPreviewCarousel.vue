<template>
	<vueper-slides v-if="images && images.length">
		<vueper-slide v-for="image in images" :key="image" :image="image" />
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
}
</script>
