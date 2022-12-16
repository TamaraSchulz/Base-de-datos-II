import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import mainRoutes from '@/router/main'
import { checkRoutePermission } from '@/utilities'

const routes: RouteRecordRaw[] = [
  ...mainRoutes,
  { path: '/:catchAll(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useTokenStore()

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' })
    }
    // if (!checkRoutePermission(to.name as string)) {
    //   next({ name: 'Home' })
    // }
  }
  next()
})

export default router
