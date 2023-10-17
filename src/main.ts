import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import registerStore from './store'
import icon from './global/registerIcon'

import 'normalize.css'
import '@/assets/css/index.css'

const app = createApp(App)

// icon是一个函数，通过use()使用时会对其进行调用，并且传入一个app的参数
app.use(icon)

// 封装对pinia的使用
// app.use(pinia)
// const loginStore = useLoginStore()
// loginStore.loadLoginStore()
app.use(registerStore)

// 动态添加路由后在对router进行全局使用
app.use(router)

app.mount('#app')
