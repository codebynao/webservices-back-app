'use strict'

const Models = require('../models')
const ClientModel = Models.client
const CommandeModel = Models.commande
const CommandeProduitModel = Models.commande_produit
const VilleModel = Models.ville
const ProduitModel = Models.produit
const lib = require('../lib')

class Commande {
  async getOrders(req, h) {
    try {
      const orders = await CommandeModel.findAll({
        ...(req.query.limit && { limit: req.query.limit }),
        raw: true
      })
      for (const order of orders) {
        const products = await CommandeProduitModel.findAll({
          where: { id_commande: order.id_commande },
          raw: true
        })

        // Add total order price
        order.nombre_produits = products.length
        order.total = lib.getOrderTotalPrice(products)
      }
      return {
        code: 200,
        data: orders
      }
    } catch (error) {
      return lib.formatErrorResponse('internal', error)
    }
  }
  async getUserOrders(req, h) {
    try {
      const orders = await CommandeModel.findAll({
        where: { id_client: req.params.clientId },
        ...(req.query.limit && { limit: req.query.limit }),
        raw: true
      })

      for (const order of orders) {
        const products = await CommandeProduitModel.findAll({
          where: { id_commande: order.id_commande },
          raw: true
        })

        // Add total order price
        order.nombre_produits = products.length
        order.total = lib.getOrderTotalPrice(products)
      }

      return {
        code: 200,
        data: orders
      }
    } catch (error) {
      return lib.formatErrorResponse('internal', error)
    }
  }

  async getOrder(req, h) {
    try {
      const order = await CommandeModel.findByPk(req.params.id, { raw: true })

      if (!order) {
        return lib.formatErrorResponse(
          'notFound',
          `La commande ayant l'identifiant ${req.params.id} est introuvable`,
          true
        )
      }

      // Get list of order products
      const orderProducts = await CommandeProduitModel.findAll({
        where: { id_commande: order.id_commande },
        raw: true
      })

      // Find each order products and add them to order products list
      order.produits = []
      for (const orderProduct of orderProducts) {
        const product = await ProduitModel.findByPk(orderProduct.id_produit, {
          raw: true
        })
        if (product) {
          product.total_avec_remise =
            orderProduct.prix_unitaire * orderProduct.quantite
          product.total = lib.getOrderProductTotalPrice(orderProduct)
          product.quantite = orderProduct.quantite
          product.taux_remise = orderProduct.taux_remise
          order.produits.push(product)
        }
      }

      // Get order total price
      order.total = lib.getOrderTotalPrice(orderProducts)

      // Get client
      const client = await ClientModel.findByPk(order.id_client, { raw: true })

      // If no client found, return empty client
      if (!client) {
        order.client = null
        return {
          code: 200,
          data: order
        }
      }

      // Get city from client's city
      const city = await VilleModel.findByPk(client.id_ville, { raw: true })

      // Format ville with street name, zip code, city and country code
      if (city) {
        const rue = client.adresse
        client.adresse = {
          rue,
          code_postal: city.code_postal,
          ville: city.nom,
          code_pays: city.code_pays
        }
      }

      order.client = client

      return {
        code: 200,
        data: order
      }
    } catch (error) {
      return lib.formatErrorResponse('internal', error)
    }
  }
}

module.exports = new Commande()
