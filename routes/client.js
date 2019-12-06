'use strict'

const ClientController = require('../controllers/client')
const Client = {
  name: 'Client',
  version: '1.0.0',

  register: async (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/clients',
        config: { auth: false },
        handler: async (req, h) => {
          return await ClientController.getAllClients(req, h)
        }
      }
    ])
  }
}
module.exports = Client
