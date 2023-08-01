<template>
	<div class="explore-gig-category">
		<router-link
			to="/"
			class="home-icon explore-header-home-icon"
			v-html="$getSvg('home-icon')"
		></router-link>
		<!-- Display category from URL -->
		<span class="breadcrumb-item">/</span>
		<span class="breadcrumb-item subcategory-header">{{
			categoryFromUrl
		}}</span>
		<br /><span class="breadcrumb-item last-category">{{
			subCategory
		}}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			categoryFromUrl: '',
			subCategoryMapping: {
				'Graphics & Design': 'Logo Design',
				'Programming & Tech': 'Web Applications',
				'Digital Marketing': 'Video Marketing',
				'Video & Animation': 'Logo Animation',
				'Writing & Translation': 'Book Editing',
				'Music & Audio': 'Voice Over',
				Business: 'Sales',
				Data: 'Data Entry',
				Photography: 'Product Photographers',
				'AI Service': 'AI Applications',
			},
		}
	},
	computed: {
		subCategory() {
			// Return the sub-category from the mapping based on the categoryFromUrl
			return (
				this.subCategoryMapping[this.categoryFromUrl] || 'Logo Design'
			)
		},
	},
	created() {
		// Extract category from the URL, decode it, and capitalize the first letter of each word
		this.categoryFromUrl = decodeURIComponent(
			this.$route.query.category || ''
		).replace(/\b\w/g, (l) => l.toUpperCase())
	},
}
</script>
