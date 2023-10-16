import type { IAccount } from '@/types'
import myRequest from '..'
// import { TOKEN } from '@/global/constants'
// import { localCache } from '@/utils/cache'

export function accountLoginRequest(account: IAccount) {
  return myRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return myRequest.get({
    url: `/users/${id}`
    // 在每次网络请求都在请求头信息配置携带token
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(TOKEN)
    // }
  })
}

export function getUserMenuByRoleId(roleId: number) {
  return myRequest.get({
    url: `/role/${roleId}/menu`
  })
}
