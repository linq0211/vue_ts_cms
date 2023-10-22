export interface ISyetem {
  roleList: any
  departmentList: any
  allMenuList: any
  pageTotalCount: number
  pageList: any
}

export interface IStory{
  storyList: any
}

export interface IModalConfig {
  pageName: string
  header: {
    newHeader: string
    editHeader: string
  }
  formItem: any[]
}
