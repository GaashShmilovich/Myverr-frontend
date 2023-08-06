<template>
	<div class="mobile-explore-footer-container">
		<router-link
			to="/"
			class="explore-footer-icon mobile-explore-footer-home"
			v-html="$getSvg('bigger-home-icon')"
		></router-link>
		<i
			class="explore-footer-icon mobile-explore-footer-inbox"
			v-html="$getSvg('inbox-icon')"
		></i>
		<i
			class="explore-footer-icon mobile-explore-footer-search"
			v-html="$getSvg('white-search-big-2')"
		></i>
		<router-link
			to="/user/:id/orders"
			class="explore-footer-icon mobile-explore-footer-orders"
			v-html="$getSvg('notepad')"
		></router-link>
		<router-link
			to="/user/:id"
			class="explore-footer-icon mobile-explore-footer-profile"
			v-html="$getSvg('big-profile')"
		></router-link>
	</div>
</template>

<script>
export default {}
</script>
