export const MOCK_ROLES_LEVEL_2 = [
  {
    _id: 'role-client-sample-id-12345678',
    name: 'client',
    permissions: [
      'create_support',
      'read_support',
      'update_support',
      'delete_support'
    ]
  },
  {
    _id:'role-moderator-sample-id-12345678',
    name: 'moderator',
    permissions: [
      //support
      'create_support',
      'read_support',
      'update_support',
      'delete_support',
      //message
      'create_message',
      'read_message',
      'update_message',
      'delete_message'
    ]
  },
  {
    _id: 'role-admin-sample-id-12345678',
    name: 'admin',
    permissions: [
      //support
      'create_support',
      'read_support',
      'update_support',
      'delete_support',
      //message
      'create_message',
      'read_message',
      'update_message',
      'delete_message',
      //admin-tools
      'create_admin-tools',
      'read_admin-tools',
      'update_admin-tools',
      'delete_admin-tools'
    ]
  }
]

export const MOCK_USERS_LEVEL_2 = {
  ID: 'congthong2015-sample-id-12345678',
  EMAIL: 'congthong2015@gmail.com',
  PASSWORD: 'congthong2015@123',
  ROLE: 'moderator'
}