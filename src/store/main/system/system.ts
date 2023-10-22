import {
  postDepartmentList,
  postRoleList,
  postMenuList,
  postPageList,
  addPageRequest,
  deletePageRequest,
  editPageRequest
} from '@/service/main/system/system'
import type { ISyetem } from '@/types'
import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', {
  state: (): ISyetem => ({
    roleList: [],
    departmentList: [],
    allMenuList: [],
    pageTotalCount: 0,
    pageList: []
  }),
  actions: {
    async fetchRoleListAction() {
      const roleListResult = await postRoleList()
      this.roleList = roleListResult.data.list
    },
    async fetchDepartmentListAction() {
      const departmentResult = await postDepartmentList()
      this.departmentList = departmentResult.data.list
    },
    async fetchMenuListAction() {
      const menuResult = await postMenuList()
      this.allMenuList = menuResult.data.list
    },
    async fetchPageListAction(pageName: string, queryData: any) {
      const pageResult = await postPageList(pageName, queryData)
      this.pageTotalCount = pageResult.data.totalCount
      this.pageList = pageResult.data.list
    },
    async addPageAction(pageName: string, addData: any) {
      // 增加
      await addPageRequest(pageName, addData)

      // 重新获取列表
      this.fetchPageListAction(pageName, { offset: 0, size: 10 })
    },
    async deletePageAction(pageName: string, id: number) {
      // 删除
      await deletePageRequest(pageName, id)

      // 重新获取列表
      this.fetchPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageAction(pageName: string, id: number, editData: any) {
      // 修改
      await editPageRequest(pageName, id, editData)

      // 重新获取列表
      this.fetchPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
