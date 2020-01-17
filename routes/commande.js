'use strict'

const CommandeController = require('../controllers/commande')
const Joi = require('joi')

const Commande = {
  name: 'Commande',
  version: '1.0.0',

  register: async (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/commandes/client/{clientId}',
        config: {
          validate: {
            params: {
              clientId: Joi.string()
                .max(11)
                .required()
            },
            query: {
              limit: Joi.number().optional()
            }
          }
        },
        handler: async (req, h) => {
          return await CommandeController.getUserOrders(req, h)
        }
      },
      {
        method: 'GET',
        path: '/commandes',
        config: {
          validate: {
            query: {
              limit: Joi.number().optional()
            }
          }
        },
        handler: async (req, h) => {
          return await CommandeController.getOrders(req, h)
        }
      },
      {
        method: 'GET',
        path: '/commandes/{id}',
        config: {
          validate: {
            params: {
              id: Joi.string()
                .max(11)
                .required()
            }
          }
        },
        handler: async (req, h) => {
          return await CommandeController.getOrder(req, h)
        }
      }
    ])
  }
}
module.exports = Commande
