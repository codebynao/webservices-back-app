'use strict'

const authController = require('../controllers/auth')
const Joi = require('joi')

const Auth = {
  name: 'Auth',
  version: '1.0.0',

  register: async (server, options) => {
    server.route([
      {
        method: 'POST',
        path: '/auth/login',
        config: {
          validate: {
            payload: {
              email: Joi.string().email().required(),
              password: Joi.string().required()
            }
          }
        },
        handler: async (request) => {
          return authController.login(request)
        },
        config: { auth: false }
      }
    ])
  }
}
module.exports = Auth
