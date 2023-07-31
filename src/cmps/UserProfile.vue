<template>
    <h1>User Profile</h1>
    <div v-if="user.isSeller">
        <SellerProfile :user="user"/>
    </div>
    <div v-else >
        <BuyerProfile :user="user"/>
    </div>
</template>

<script>
import SellerProfile from './SellerProfile.vue'
import BuyerProfile from './BuyerProfile.vue'
import { userService } from '../services/user.service.js'


export default {
    data() {
        return {
            user: null
        }
    },
    components: {
        SellerProfile,
        BuyerProfile,
    },
    
}
</script>