export const roles = {
  CLIENT: 'client',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
}

export const permissions = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_SUPPORT: 'view_support',
  VIEW_MESSAGES: 'view_messages',
  VIEW_REVENUE: 'view_revenue',
  VIEW_ADMIN_TOOLS: 'view_admin_tools'
}

export const rolePermissions = {
  [roles.CLIENT]: {
    permissions: [permissions.VIEW_DASHBOARD, permissions.VIEW_SUPPORT],
    inherits: []
  },
  [roles.MODERATOR]: {
    permissions: [permissions.VIEW_MESSAGES],
    inherits: [roles.CLIENT]
  },
  // admin thì dùng đc hết tất cả
  [roles.ADMIN]: {
    permissions: [permissions.VIEW_REVENUE, permissions.VIEW_ADMIN_TOOLS],
    inherits: [roles.CLIENT, roles.MODERATOR]
  }
}