import { accountLoginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache('token') ?? ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 发送网络请求
      const res = await accountLoginRequest(account)
      this.id = res.data.id
      this.name = res.data.name
      this.token = res.data.token

      // 使用缓存工具对token进行缓存
      localCache.setCache('token', this.token)
    }
  }
})

export default useLoginStore
