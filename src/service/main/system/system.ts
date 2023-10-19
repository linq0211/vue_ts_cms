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

// 获取用户列表
export function postUserList(queryData: any) {
  return myRequest.post({
    url: '/users/list',
    data: queryData
  })
}

// 增加用户
export function addUserRequest(addData: any) {
  return myRequest.post({
    url: '/users',
    data: addData
  })
}

// 删除用户
export function deleteUserRequest(id: number) {
  return myRequest.delete({
    url: `/users/${id}`
  })
}

// 修改用户
export function editUserRequest(id: number, editData: any) {
  return myRequest.patch({
    url: `/users/${id}`,
    data: editData
  })
}
