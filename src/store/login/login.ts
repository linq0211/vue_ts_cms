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
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenu: localCache.getCache('userMenu') ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 请求用户登录
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      // 缓存token
      localCache.setCache(TOKEN, this.token)

      // 通过用户登录的用户id判断当前用户信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 通过用户信息的角色roleId获取菜单信息
      const role = this.userInfo.role
      const userMenuResult = await getUserMenuByRoleId(role.id)
      const userMenu = userMenuResult.data
      this.userMenu = userMenu

      // 使用缓存工具进行缓存，防止刷新后数据丢失
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenu', userMenu)

      // 跳转至main页面
      router.push('/main')
    }
  }
})

export default useLoginStore
