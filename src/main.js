import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faChartLine,
    faChildren,
    faHome,
    faAddressCard,
    faStar,
} from '@fortawesome/free-solid-svg-icons'
import './assets/styles/main.scss'
import './assets/styles/setup/_typography.scss'
import App from './App.vue'

const app = createApp(App)
library.add(faChartLine, faChildren, faHome, faAddressCard, faStar)

app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElementPlus)
app.mount('#app')
