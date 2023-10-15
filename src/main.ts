import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia from './store'
import registerIcon from './global/registerIcon'

import 'normalize.css'
import '@/assets/css/index.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
// registerIcon是一个函数，通过use()使用时会对其进行调用，并且传入一个app的参数
app.use(registerIcon)
app.mount('#app')
