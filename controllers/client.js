'use strict'

const Models = require('../models')
const ClientModel = Models.client
const CommandeModel = Models.commande
const CommandeProduitModel = Models.commande_produit
const VilleModel = Models.ville
const lib = require('../lib')
const Op = require('sequelize').Op

class Client {
  async getAllClients(req, h) {
    try {
      const clients = await ClientModel.findAll({
        where: {
          is_deleted: 0
        },
        raw: true
      })

      for (const client of clients) {
        // Get client's orders
        const orders = await CommandeModel.findAll({
          where: { id_client: client.id_client },
          attributes: ['id_commande', 'date_commande', 'numero'],
          limit: 5,
          raw: true,
          logging: false
        })

        // Get products in orders to calculate the total price of the order
        for (const order of orders) {
          const products = await CommandeProduitModel.findAll({
            where: { id_commande: order.id_commande },
            attributes: ['quantite', 'taux_remise', 'prix_unitaire'],
            raw: true,
            logging: false
          })
          // Add total order price
          order.total = lib.getOrderTotalPrice(products)
        }
        client.orders = orders

        // Get city from client's city
        const city = await VilleModel.findByPk(client.id_ville, { raw: true })

        // Format ville with street name, zip code, city and country code
        if (city) {
          client.ville = {
            code_postal: city.code_postal,
            nom: city.nom
          }
        }
      }
      return {
        code: 200,
        data: clients
      }
    } catch (error) {
      return lib.formatErrorResponse('internal', error)
    }
  }

  async getClient(req, h) {
    try {
      const client = await ClientModel.findByPk(req.params.id, { raw: true })

      if (!client) {
        return lib.formatErrorResponse(
          'notFound',
          `Le client ayant l'identifiant ${req.params.id} est introuvable`,
          true
        )
      }

      // Get city from client's city
      const city = await VilleModel.findByPk(client.id_ville, { raw: true })

      // Format ville with street name, zip code, city and country code
      if (city) {
        client.ville = {
          code_postal: city.code_postal,
          nom: city.nom
        }
      }

      return {
        code: 200,
        data: client
      }
    } catch (error) {
      return lib.formatErrorResponse('internal', error)
    }
  }

  async createClient(req, h) {
    try {
      const payload = req.payload

      const clientWithNumero = await ClientModel.findOne({
        where: { numero: payload.numero }
      })

      if (clientWithNumero) {
        return lib.formatErrorResponse(
          'badRequest',
          'Ce numéro est déjà utilisé pour un autre client',
          true
        )
      }

      const id_client = await lib.getLastId(ClientModel, 'id_client')

      const createdClient = await ClientModel.create({
        id_client,
        nom: payload.nom,
        prenom: payload.prenom,
        adresse: payload.adresse,
        date_naissance: payload.date_naissance,
        civilite: payload.civilite,
        numero: payload.numero,
        id_ville: payload.id_ville
      })

      return {
        code: 201,
        data: createdClient
      }
    } catch (error) {
      return lib.formatErrorResponse('internal', error)
    }
  }

  async updateClient(req, h) {
    try {
      const payload = req.payload

      const clientWithNumero = await ClientModel.findOne({
        where: {
          numero: payload.numero,
          id_client: { [Op.ne]: req.params.id_client }
        }
      })

      if (clientWithNumero) {
        return lib.formatErrorResponse(
          'badRequest',
          'Ce numéro est déjà utilisé pour un autre client',
          true
        )
      }

      await ClientModel.update(
        {
          nom: payload.nom,
          prenom: payload.prenom,
          adresse: payload.adresse,
          date_naissance: payload.date_naissance,
          civilite: payload.civilite,
          numero: payload.numero,
          id_ville: payload.id_ville
        },
        { where: { id_client: req.params.id } }
      )

      return {
        code: 200,
        data: true // No new client to return but still shows that request was successful
      }
    } catch (err) {
      return lib.formatErrorResponse('internal', error)
    }
  }

  async deleteClient(req, h) {
    try {
      await ClientModel.update(
        { is_deleted: 1 },
        { where: { id_client: req.params.id } }
      )

      // Delete client's orders
      const orders = await CommandeModel.findAll({ id_client: req.params.id })

      const orderPromises = []
      for (const order of orders) {
        orderPromises.push(order.update({ is_deleted: 1 }))
      }
      await Promise.all(orderPromises)
      return {
        code: 204,
        data: true // No client to return but still shows that request was successful
      }
    } catch (error) {
      return lib.formatErrorResponse('internal', error)
    }
  }
}

module.exports = new Client()
