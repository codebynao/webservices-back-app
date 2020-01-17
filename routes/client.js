'use strict'

const ClientController = require('../controllers/client')
const Joi = require('joi')

const Client = {
  name: 'Client',
  version: '1.0.0',

  register: async (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/clients',
        handler: async (req, h) => {
          return await ClientController.getAllClients(req, h)
        }
      },
      {
        method: 'GET',
        path: '/clients/{id}',
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
          return await ClientController.getClient(req, h)
        }
      },
      {
        method: 'POST',
        path: '/clients',
        config: {
          validate: {
            payload: {
              nom: Joi.string().required(),
              prenom: Joi.string().required(),
              adresse: Joi.string().optional(),
              date_naissance: Joi.string().optional(),
              civilite: Joi.string().optional(),
              numero: Joi.string().required(),
              id_ville: Joi.number().optional()
            }
          }
        },
        handler: async (req, h) => {
          return await ClientController.createClient(req, h)
        }
      },
      {
        method: 'PUT',
        path: '/clients/{id}',
        config: {
          validate: {
            params: {
              id: Joi.string()
                .max(11)
                .required()
            },
            payload: {
              id_client: Joi.string()
                .max(11)
                .required(),
              nom: Joi.string().required(),
              prenom: Joi.string().required(),
              adresse: Joi.string().optional(),
              date_naissance: Joi.string().optional(),
              civilite: Joi.string().optional(),
              numero: Joi.string().required(),
              id_ville: Joi.number().optional()
            }
          }
        },
        handler: async (req, h) => {
          return await ClientController.updateClient(req, h)
        }
      },
      {
        method: 'DELETE',
        path: '/clients/{id}',
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
          return await ClientController.deleteClient(req, h)
        }
      }
    ])
  }
}
module.exports = Client
