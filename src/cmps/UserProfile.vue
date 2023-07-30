<template>
    <h1>User Profile</h1>
    <!-- <div v-if="user.isSeller">
        <SellerProfile />
    </div> -->
    <div>
        <OrderList :user="user"/>
    </div>
</template>

<script>
import SellerProfile from './SellerProfile.vue'
import OrderList from './OrderList.vue'
import { userService } from '../services/user.service.js'


export default {
    data() {
        return {
            user: null
        }
    },
    components: {
        SellerProfile,
        OrderList,
    },
    
}
</script>