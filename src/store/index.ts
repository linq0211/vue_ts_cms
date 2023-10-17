import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  // 全局使用pinia之后调用loadLoginStore方法进行判断读取store中数据是否有值
  app.use(pinia)
  const loginStore = useLoginStore()
  loginStore.loadLoginStore()
}

export default registerStore
