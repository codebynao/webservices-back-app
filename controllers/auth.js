'use strict'

const Models = require('../models')
const UserModel = Models.user
const lib = require('../lib')
const Boom = require('boom')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.SECRET_KEY
const CRYPT_KEY = process.env.CRYPT_KEY
const crypto = require('crypto-js')

class Auth {
  async login(req, h) {
    try {
      const { email, password } = req.payload
      const decryptedPwd = crypto.AES.decrypt(password, CRYPT_KEY).toString(
        crypto.enc.Utf8
      )
      const user = await UserModel.findOne({
        where: {
          email,
          password: decryptedPwd
        }
      })

      if (!user) {
        return Boom.unauthorized()
      }

      const token = jwt.sign({ email }, JWT_KEY, { algorithm: 'HS256' })

      return { code: 200, token, userId: user.id_user }
    } catch (error) {
      console.info(error)
      return Boom.internal()
    }
  }
}

module.exports = new Auth()
