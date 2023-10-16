import { defineStore } from 'pinia'
import type { IAccount, ILoginState } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { TOKEN } from '@/global/constants'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuByRoleId
} from '@/service/login/login'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(TOKEN) ?? '',
    userInfo: {},
    userMenu: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 发送网络请求
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token

      // 使用缓存工具对token进行缓存
      localCache.setCache(TOKEN, this.token)

      // 通过id判断当前用户信息
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data

      // 通过用户信息中的角色roleId获取菜单信息
      const role = this.userInfo.role
      const userMenuResult = await getUserMenuByRoleId(role.id)
      this.userMenu = userMenuResult.data

      // 跳转至main页面
      router.push('/main')
    }
  }
})

export default useLoginStore
