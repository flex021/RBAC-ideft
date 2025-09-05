import { useMemo } from 'react'
import { rolePermissions } from '~/config/rbacConfig'

export const usePermission = (userRoles = []) => {
  const resolvedPermissions = useMemo(() => {
    const permissions = new Set()
    const resolveRolePermissions = (roleName, visited = new Set()) => {
      if (visited.has(roleName)) return
      visited.add(roleName)

      const role = rolePermissions[roleName]
      if (!role) return

      role.permissions.forEach((p) => permissions.add(p))

      role.inherits.forEach((parentRole) => resolveRolePermissions(parentRole, visited))
    }

    userRoles.forEach((role) => resolveRolePermissions(role))
    return permissions
  }, [userRoles])

  const hasPermission = (permission) => {
    return resolvedPermissions.has(permission)
  }

  return { hasPermission }
}