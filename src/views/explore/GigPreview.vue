<template>
	<div class="gig-preview-container">
		<div class="gig-preview">
			<div class="gig-preview__img-container">
				<img
					src="https://picsum.photos/330/220"
					alt="gig.title"
					class="gig-preview__img"
				/>
			</div>
			<div class="gig-preview__info">
				<div class="owner-preview-container">
					<img
						class="gig-owner-img"
						src="https://picsum.photos/24/24"
						alt=""
					/>
					<h3 class="gig-preview-owner">
						{{ gig.owner.fullname }}<br /><span>{{
							gig.owner.level
						}}</span>
					</h3>
				</div>
				<h4 class="gig-preview__title">{{ gig.title }}</h4>
				<p class="gig-preview-rate">⭐{{ gig.owner.rate }}</p>
				<hr />
				<div class="gig-preview-footer-container">
					<p class="gig-like-btn">❤</p>
					<p class="gig-preview__price">
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
}
</script>
