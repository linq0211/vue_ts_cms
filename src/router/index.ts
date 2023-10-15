import { TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/notFound.vue')
    }
  ]
})

/**
 * 导航守卫
 *  参数：to跳转到的位置，from从哪里跳转过来
 *  返回值：决定导航的路径(不返回或者返回undefined，会进行默认跳转)
 */

router.beforeEach((to) => {
  // 获取token
  const token = localCache.getCache(TOKEN)

  // 判断跳转页面是否为main并且是否缓存中携带token
  if (!token && to.path === '/main') {
    return '/login'
  }
})

export default router
