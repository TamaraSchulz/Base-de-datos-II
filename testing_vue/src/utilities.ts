import router from '@/router'
import { useTokenStore } from '@/stores/token'
import { Group } from '@/interfaces'

function checkRoutePermission(
  routeName: string,
  routeParams: Record<string, string | never> = {}
): boolean {
  const tokenStore = useTokenStore()
  const user = tokenStore.user
  const route = router.resolve({ name: routeName, params: routeParams })

  if (user !== null && user.groups) {
    if (route.meta.allowedGroups) {
      return user.groups.some((group: Group) =>
        (route.meta.allowedGroups as string[]).includes(group.name)
      )
    } else {
      return true
    }
  }

  return false
}

export { checkRoutePermission }
