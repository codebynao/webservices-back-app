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
        method: 'POST',
        path: '/villes',
        config: {
          auth: false,
          validate: {
            payload: {
              nom: Joi.string().required(),
              code_postal: Joi.string().required(),
              code_pays: Joi.string()
                .max(2)
                .required(),
              id_maire: Joi.string().optional()
            }
          }
        },
        handler: async (req, h) => {
          return await VilleController.createCity(req, h)
        }
      },
      {
        method: 'GET',
        path: '/villes/zipcode/{zipcode}',
        config: {
          auth: false,
          validate: {
            params: {
              zipcode: Joi.string()
                .max(10)
                .required()
            }
          }
        },
        handler: async (req, h) => {
          return await VilleController.getCityByZipcode(req, h)
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
          return await VilleController.getCityById(req, h)
        }
      }
    ])
  }
}
module.exports = Ville
