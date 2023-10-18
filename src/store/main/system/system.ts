import { postUserList } from '@/service/main/system/system'
import type { ISyetem } from '@/types'
import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', {
  state: (): ISyetem => ({
    totalCount: 0,
    userList: []
  }),
  actions: {
    async fetchUserListAction() {
      const userListResult = await postUserList()
      this.totalCount = userListResult.data.totalCount
      this.userList = userListResult.data.list
    }
  }
})

export default useSystemStore
