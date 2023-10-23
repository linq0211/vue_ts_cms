export interface IAccount {
  name: string
  password: string
}

export interface ILoginState {
  token: string
  userInfo: any // UserInfo
  userMenu: any // Array<UserMenu>
  permissions: string[]
}
// interface UserInfo {
//   id: number
//   name: string
//   realname: string
//   cellphone: number
//   enable: number
//   createAt: string
//   updateAt: string
//   role: {
//     id: number
//     name: string
//     intro: string
//     createAt: string
//     updateAt: string
//   }
//   department: {
//     id: number
//     name: string
//     parentId: any
//     createAt: string
//     updateAt: string
//     leader: string
//   }
// }

// interface UserMenu {
//   id: number
//   name: string
//   type: number
//   url: string
//   icon: string
//   sort: number
//   children: Array<{
//     id: number
//     url: string
//     name: string
//     sort: number
//     type: number
//     children: any
//     parentId: number
//   }>
// }
