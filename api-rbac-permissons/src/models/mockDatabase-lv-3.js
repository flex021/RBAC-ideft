export const MOCK_ROLES_LEVEL_3 = [
  {
    _id: 'role-client-sample-id-12345678',
    name: 'client',
    permissions: [
      'create_support',
      'read_support',
      'update_support',
      'delete_support'
    ],
    inherits: []
  },
  {
    _id:'role-moderator-sample-id-12345678',
    name: 'moderator',
    permissions: [
      //message
      'create_message',
      'read_message',
      'update_message',
      'delete_message'
    ],
    inherits: ['client']
  },
  {
    _id: 'role-admin-sample-id-12345678',
    name: 'admin',
    permissions: [
      //admin-tools
      'create_admin_tools',
      'read_admin_tools',
      'update_admin_tools',
      'delete_admin_tools'
    ],
    inherits: ['client', 'moderator']
  }
]

export const MOCK_USERS_LEVEL_3_ADMIN = {
  ID: 'congthong2015-sample-id-12345678',
  EMAIL: 'admin-rbac@gmail.com',
  PASSWORD: 'admin@123',
  ROLES: ['admin']
}

export const MOCK_USERS_LEVEL_3_MODERATOR = {
  ID: 'congthong2015-sample-id-12345678',
  EMAIL: 'moderator-rbac@gmail.com',
  PASSWORD: 'moderator@123',
  ROLES: ['moderator']
}

export const MOCK_USERS_LEVEL_3_CLIENT = {
  ID: 'congthong2015-sample-id-12345678',
  EMAIL: 'client-rbac@gmail.com',
  PASSWORD: 'client@123',
  ROLES: ['client']
}