import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import MyRequest from './request'
import { TOKEN } from '@/global/constants'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 通过拦截器对每次请求携带token
  interceptors: {
    requestSuccessFn(config) {
      // 获取token
      const token = localCache.getCache(TOKEN)

      // 判断token是否有值，请求信息中是否有请求头信息
      if (token && config.headers) {
        config.headers.Authorization = 'Bearer ' + token
      }

      return config
    }
  }
})

export default myRequest
