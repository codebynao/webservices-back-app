'use strict'

const Models = require('../models')

class Client {
  async getAllClients(req, h) {
    try {
      const clients = await Models.client.findAll({ raw: true })

      return {
        code: 200,
        data: clients
      }
    } catch (error) {
      console.error(error)
      return {
        code: 500,
        data: null
      }
    }
  }

  async deleteClient(clientId) {}

  async getClient(clientId) {}

  async updateClient(clientId, updatedClient) {}

  async createClient(clientToCreate) {}
}

module.exports = new Client()
