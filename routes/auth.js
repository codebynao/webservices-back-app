'use strict'

const authController = require('../controllers/auth')

const Auth = {
  name: 'Auth',
  version: '1.0.0',

  register: async (server, options) => {
    server.route([
      {
        method: 'POST',
        path: '/auth/login',
        handler: async (request) => {
          return authController.login(request)
        },
        config: { auth: false }
      }
    ])
  }
}
module.exports = Auth
