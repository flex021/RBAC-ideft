import { MOCK_ROLES_LEVEL_3 } from '~/models/mockDatabase-lv-3'

export const getPermissionFromRole = async (roleName) => {
  const role = MOCK_ROLES_LEVEL_3.find(i => i.name === roleName)
  if (!role) return []

  let permissions = new Set(role.permissions)

  if (Array.isArray(role.inherits) && role.inherits.length > 0) {
    for (const inheritedRoleName of role.inherits) {
      const inheritedRolePermissions = await getPermissionFromRole(inheritedRoleName)
      inheritedRolePermissions.forEach(i => permissions.add(i))
    }
  }

  return Array.from(permissions)
}