<template>
    <div v-if="user.isSeller">
        <SellerProfile />
    </div>
        <OrderList :user="user"/>
    <div>

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