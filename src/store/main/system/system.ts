import {
  addUserRequest,
  deleteUserRequest,
  editUserRequest,
  postDepartmentList,
  postRoleList,
  postUserList
} from '@/service/main/system/system'
import type { ISyetem } from '@/types'
import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', {
  state: (): ISyetem => ({
    userTotalCount: 0,
    userList: [],
    roleTotalCount: 0,
    roleList: [],
    departmentTotalCount: 0,
    departmentList: []
  }),
  actions: {
    async fetchUserListAction(queryData: any) {
      const userListResult = await postUserList(queryData)
      this.userTotalCount = userListResult.data.totalCount
      this.userList = userListResult.data.list
    },
    async fetchRoleListAction() {
      const roleListResult = await postRoleList()
      this.roleTotalCount = roleListResult.data.totalCount
      this.roleList = roleListResult.data.list
    },
    async fetchDepartmentListAction() {
      const departmentResult = await postDepartmentList()
      this.departmentTotalCount = departmentResult.data.totalCount
      this.departmentList = departmentResult.data.list
    },
    async addUserAction(addData: any) {
      // 增加用户
      await addUserRequest(addData)

      // 重新获取用户列表
      this.fetchUserListAction({ offset: 0, size: 10 })
    },
    async deleteUserAction(id: number) {
      // 删除用户
      await deleteUserRequest(id)

      // 重新获取用户列表
      this.fetchUserListAction({ offset: 0, size: 10 })
    },
    async editUserAction(id: number, editData: any) {
      // 修改用户
      await editUserRequest(id, editData)

      // 重新获取用户列表
      this.fetchUserListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
