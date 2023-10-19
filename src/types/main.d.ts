interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface ISyetem {
  userTotalCount: number
  userList: IUser[]
  roleTotalCount: number
  roleList: any
  departmentTotalCount: number
  departmentList: any
}
