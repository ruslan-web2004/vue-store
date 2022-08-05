import { createApp } from 'vue'
import App from './App.vue'
import Store from './store'
import Router from './router'
import * as ConfirmDialog from 'vuejs-confirm-dialog'

createApp(App).use(Store).use(Router).use(ConfirmDialog).mount('#app')
