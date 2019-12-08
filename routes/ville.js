'use strict'

const VilleController = require('../controllers/ville')
const Joi = require('joi')

const Ville = {
  name: 'Ville',
  version: '1.0.0',

  register: async (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/villes',
        config: { auth: false },
        handler: async (req, h) => {
          return await VilleController.getAllCities(req, h)
        }
      },
      {
        method: 'GET',
        path: '/villes/{id}',
        config: {
          auth: false,
          validate: {
            params: {
              id: Joi.string()
                .max(11)
                .required()
            }
          }
        },
        handler: async (req, h) => {
          return await VilleController.getCity(req, h)
        }
      }
    ])
  }
}
module.exports = Ville
