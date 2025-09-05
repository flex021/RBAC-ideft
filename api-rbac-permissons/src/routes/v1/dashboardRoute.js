import express from 'express'
import { dashboardController } from '~/controllers/dashboardController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { StatusCodes } from 'http-status-codes'
import { rbacMiddleware_level_1 } from '~/middlewares/rbacMiddleware-level-1'
import { rbacMiddleware_level_2 } from '~/middlewares/rbacMiddleware-level-2'
import { rbacMiddleware_level_3 } from '~/middlewares/rbacMiddleware-level-3'
import { MOCK_ROLES_LEVEL_1 } from '~/models/mockDatabase-lv-1'

const Router = express.Router()

Router.route('/access')
  .get(authMiddleware.isAuthorized, dashboardController.access)

Router.route('/messages')
  .get(
    authMiddleware.isAuthorized,
    //Level 1:
    // rbacMiddleware_level_1.isValidPermission([
    //   MOCK_ROLES_LEVEL_1.ADMIN,
    //   MOCK_ROLES_LEVEL_1.MODERATOR
    // ]),

    //Level 2:
    // rbacMiddleware_level_2.isValidPermission(['read_message']),

    // Level 3:
    rbacMiddleware_level_3.isValidPermission(['read_message']),

    (req, res) => {
      res.status(StatusCodes.OK).json({ message: 'API /messages is ready to use.' })
    }
  )

Router.route('/admin-tools')
  .get(
    authMiddleware.isAuthorized,

    //Level 1:
    // rbacMiddleware_level_1.isValidPermission([
    //   MOCK_ROLES_LEVEL_1.ADMIN
    // ]),

    //Level 2:
    // rbacMiddleware_level_2.isValidPermission(['read_admin_tools']),

    //Level 3:
    rbacMiddleware_level_3.isValidPermission(['read_admin_tools']),
    (req, res) => {
      res.status(StatusCodes.OK).json({ message: 'API /admin-tools is ready to use.' })
    }
  )

export const dashboardRoute = Router
