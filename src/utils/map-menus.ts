import type { RouteRecordRaw } from 'vue-router'

function loadAllRouterFiles() {
  const localRoutes: RouteRecordRaw[] = []

  // 读取router/main中的所有ts文件，并保存到localRoutes中
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })

  // 遍历获取的files中的value
  for (const key in files) {
    const modules = files[key]
    localRoutes.push(modules.default)
  }

  // [{path:,components:}...]
  return localRoutes
}

// 获取所有菜单中的第一个菜单
export let firstMenu: any = null

export function mapMenusToRoutes(userMenu: any[]) {
  const localRoutes: RouteRecordRaw[] = loadAllRouterFiles()
  // 将localRoutes中的item.path查找菜单中的url
  const route: RouteRecordRaw[] = []

  // 遍历所有的菜单
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      // 将当前用户角色对应的菜单url和所有的url进行比较，相匹配就进行保存

      // route 存放菜单对应的所有二级路由
      // routes 当前循环中和所有url匹配的二级路由
      const routes = localRoutes.find((item) => item.path === subMenu.url)
      if (routes) {
        // 给routes的顶层菜单增加重定向功能，但只需要添加一次
        if (!route.find((item) => item.path === menu.url)) {
          route.push({ path: menu.url, redirect: routes.path })
        }
        route.push(routes)
      }

      // 将相匹配的第一个菜单使用firstMenu进行保存
      if (!firstMenu && routes) firstMenu = subMenu
    }
  }

  return route
}

/**
 *  根据路径去匹配所有的菜单
 * @param path 需要匹配的路径
 * @param userMenu 所有的菜单
 */
export function mapPathToMenus(path: string, userMenu: any) {
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      if (path === subMenu.url) {
        return subMenu
      }
    }
  }
}
interface ICrumb {
  name: string
  path: string
}
export function mapPathToCrumb(path: string, userMenu: any) {
  const breadCrumb: ICrumb[] = []
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      if (path === subMenu.url) {
        // 路径和子菜单的url相匹配时，传入一级菜单和二级菜单
        breadCrumb.push({ name: menu.name, path: menu.url })
        breadCrumb.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadCrumb
}

export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []
  // 普通方法
  // for (const itemX of menuList) {
  //   if(!itemX.children) continue
  //   for(const itemY of itemX.children) {
  //     if(!itemY.children) continue
  //     for(const itemZ of itemY.children) {
  //       ids.push(itemZ.id)
  //     }
  //   }
  // }

  // 递归
  function recurseFn(menus: any[]) {
    for (const menu of menus) {
      if (menu.children) {
        recurseFn(menu.children)
      } else {
        ids.push(menu.id)
      }
    }
  }
  recurseFn(menuList)
  return ids
}

export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseFn(menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 3) {
        permissions.push(menu.permission)
      } else {
        recurseFn(menu.children ?? [])
      }
    }
  }
  recurseFn(menuList)

  return permissions
}
