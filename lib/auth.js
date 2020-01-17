const jwtPlugin = require('hapi-auth-jwt2').plugin
const JWT_KEY = process.env.SECRET_KEY || 'NeverShareYourSecret'
const Boom = require('boom')
const Models = require('../models')
const UserModel = Models.user

var validate = async (credentials) => {
  const email = credentials.email
  
  if (!email) {
    return Boom.unauthorized()
  }
  
  const user = await UserModel.findOne({ where: { email }})

  if (!user) {
    return Boom.unauthorized()
  }

  return {
    isValid: true
  }
}

exports.configureAuth = async (server) => {
  await server.register(jwtPlugin)
  server.auth.strategy('admin', 'jwt', {
    key: JWT_KEY,
    validate,
    verifyOptions: { algorithms: [ 'HS256' ] }
  })

  // Default all routes to require JWT and opt out for public routes
  server.auth.default('admin')
}