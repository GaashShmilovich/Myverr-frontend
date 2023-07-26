<template>
    <div class="gig-list-container">
        <h2>Gigs</h2>
        <ul class="gig-list">
            <li v-for="gig in gigs" :key="gig._id">
                <GigPreview :gig="gig">  
                </GigPreview>
            </li>
        </ul>        
    </div>
</template>

<script>
import GigPreview from './GigPreview.vue'

export default {
    props: ['gigs'],
    components: {
        GigPreview
    }
}

</script>