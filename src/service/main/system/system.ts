import myRequest from '@/service'

// 获取部门列表
export function postDepartmentList() {
  return myRequest.post({
    url: '/department/list'
  })
}

// 获取角色列表
export function postRoleList() {
  return myRequest.post({
    url: '/role/list'
  })
}

// 获取列表
export function postPageList(pageName: string, queryData: any = {}) {
  return myRequest.post({
    url: `/${pageName}/list`,
    data: queryData
  })
}

// 增加
export function addPageRequest(pageName: string, addData: any) {
  return myRequest.post({
    url: `/${pageName}`,
    data: addData
  })
}

// 删除
export function deletePageRequest(pageName: string, id: number) {
  return myRequest.delete({
    url: `/${pageName}/${id}`
  })
}

// 修改
export function editPageRequest(pageName: string, id: number, editData: any) {
  return myRequest.patch({
    url: `/${pageName}/${id}`,
    data: editData
  })
}
