<template>
	<div class="explore-gig-category">
		<router-link
			to="/"
			class="home-icon explore-header-home-icon"
			v-html="$getSvg('home-icon')"
		></router-link>
		<!-- Display category from URL -->
		<span class="breadcrumb-item">/</span>
		<span
			class="breadcrumb-item subcategory-header"
			v-if="categoryFromUrl !== 'No Category'"
		>
			{{ categoryFromUrl }}
		</span>
		<br /><span class="breadcrumb-item last-category">{{
			subCategory
		}}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			categoryFromUrl: 'No Category',
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
			// If category is "No Category", return "All Services"
			if (this.categoryFromUrl === 'No Category') {
				return 'All Services'
			}
			// Else, return the sub-category from the mapping based on the categoryFromUrl
			return (
				this.subCategoryMapping[this.categoryFromUrl] || 'Logo Design'
			)
		},
	},
	watch: {
		'$route.query.category': {
			immediate: true,
			handler() {
				const decodedCategory = decodeURIComponent(
					this.$route.query.category || ''
				).replace(/\b\w/g, (l) => l.toUpperCase())

				if (decodedCategory) {
					this.categoryFromUrl = decodedCategory
				} else {
					this.categoryFromUrl = 'No Category'
				}
			},
		},
	},
}
</script>
