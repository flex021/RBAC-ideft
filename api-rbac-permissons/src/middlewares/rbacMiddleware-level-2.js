import { StatusCodes } from 'http-status-codes'
import { MOCK_ROLES_LEVEL_2 } from '~/models/mockDatabase-lv-2'

const isValidPermission = (requiredPermissions) => async (req, res, next) => {
  try {
    const userRole = req.jwtDecoded.role
    if (!userRole) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'Forbidden: Có vấn đề với role của bạn!'
      })
      return
    }
    const fullUserRole = MOCK_ROLES_LEVEL_2.find(i => i.name === userRole)
    if (!fullUserRole) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'Forbidden: Không tồn tại role của bạn trong hệ thống!'
      })
      return
    }
    const hasPermission = requiredPermissions?.every(i => fullUserRole.permissions.includes(i))
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

export const rbacMiddleware_level_2 = {
  isValidPermission
}
