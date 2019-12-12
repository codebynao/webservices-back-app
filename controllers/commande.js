'use strict'

const Models = require('../models')
const ClientModel = Models.client
const CommandeModel = Models.commande
const CommandeProduitModel = Models.commande_produit
const VilleModel = Models.ville
const ProduitModel = Models.produit
const lib = require('../lib')

class Ville {
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
      return lib.formatErrorResponse(500, error)
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
      return lib.formatErrorResponse(500, error)
    }
  }

  async getOrder(req, h) {
    try {
      const order = await CommandeModel.findOne({
        where: { id_commande: req.params.id },
        raw: true
      })

      if (!order) {
        return lib.formatErrorResponse(
          404,
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
        const product = await ProduitModel.findOne({
          where: { id_produit: orderProduct.id_produit },
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
      const client = await ClientModel.findOne({
        where: { id_client: order.id_client },
        raw: true
      })

      // If no client found, return empty client
      if (!client) {
        order.client = null
        return {
          code: 200,
          data: order
        }
      }

      // Get city from client's city
      const ville = await VilleModel.findOne({
        where: { id_ville: client.id_ville },
        raw: true
      })

      // Format ville with street name, zip code, city and country code
      if (ville) {
        const rue = client.adresse
        client.adresse = {
          rue,
          code_postal: ville.code_postal,
          ville: ville.nom,
          code_pays: ville.code_pays
        }
      }

      order.client = client

      return {
        code: 200,
        data: order
      }
    } catch (error) {
      return lib.formatErrorResponse(500, error)
    }
  }
}

module.exports = new Ville()
