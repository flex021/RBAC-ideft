import { StatusCodes } from 'http-status-codes'
import { getPermissionFromRole } from '~/utils/rbacUtils'


const isValidPermission = (requiredPermissions) => async (req, res, next) => {
  try {
    const userRole = req.jwtDecoded.role

    if (!Array.isArray(userRole) || userRole.length === 0) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'Forbidden: Có vấn đề với role của bạn!'
      })
      return
    }

    let userPermissions = new Set()
    for (const roleName of userRole) {
      const rolePermissions = await getPermissionFromRole(roleName)
      rolePermissions.forEach(i => userPermissions.add(i))
    }

    const hasPermission = requiredPermissions?.every(i => userPermissions.has(i))
    if (!hasPermission) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'Forbidden: Bạn không đủ quyền truy cập vào API này!'
      })
      return
    }
    next()
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json( { message: 'Oops! Something went wrong!' } )
  }
}

export const rbacMiddleware_level_3 = {
  isValidPermission
}
