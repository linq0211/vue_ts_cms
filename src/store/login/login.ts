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
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import useSystemStore from '../main/system/system'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenu: [],
    permissions: []
  }),
  actions: {
    // 用户点击登录时
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

      // 获取按钮权限
      const permissions = mapMenusToPermissions(userMenu)
      this.permissions = permissions

      // 使用缓存工具进行缓存，防止刷新后数据丢失
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenu', userMenu)

      // 动态路由
      const route = mapMenusToRoutes(userMenu)
      route.forEach((item) => router.addRoute('main', item))

      // 获取角色和菜单列表
      const systemStore = useSystemStore()
      systemStore.fetchOtherListAction()

      // 跳转至main页面
      router.push('/main')
    },
    // 无论第一次或者重新进入哪个页面，都会执行
    loadLoginStore() {
      // 刷新页面的时重新进行一次路由映射
      const token = localCache.getCache(TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenu = localCache.getCache('userMenu')

      // 判断store中的数据是否已经在本地有值，判断了之后就放入值
      if (token && userInfo && userMenu) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu

        // 获取角色和菜单列表
        const systemStore = useSystemStore()
        systemStore.fetchOtherListAction()

        // 获取按钮权限
        const permissions = mapMenusToPermissions(userMenu)
        this.permissions = permissions

        // 在进行动态路由的增加
        const route = mapMenusToRoutes(userMenu)
        route.forEach((item) => router.addRoute('main', item))
      }
    }
  }
})

export default useLoginStore
