'use strict'

const Boom = require('boom')

/**
 * Format the error response and log it
 * @param {String} errorName
 * @param {Object|String} error
 * @param {Boolean} isWarning
 * @returns {Object}
 */
const formatErrorResponse = (errorName, error, isWarning = false) => {
  if (isWarning) {
    console.warn(error)
  } else {
    console.error(error)
  }

  const message = error.message || error
  return Boom[errorName] && Boom[errorName](message) || {
    code: 500,
    error: message
  }
}

/**
 * Get the last id to create a new instance in DB
 * @param {Sequelize Model} Model
 * @param {String} idKey
 */
const getLastId = async (Model, idKey) => {
  const results = await Model.findAll({ attributes: [idKey], raw: true })
  const higherKey = Math.max(...results.map(result => result[idKey]))
  return higherKey + 1
}

/**
 * Get total price from list of products
 * @param {Array} products
 * @returns {Number}
 */
const getOrderTotalPrice = products => {
  let total = 0
  for (const product of products) {
    total += getOrderProductTotalPrice(product)
  }
  return total
}
/**
 * Get total price for a product in an order
 * @param {Object} product
 * @returns {Number}
 */
const getOrderProductTotalPrice = product => {
  const price = product.prix_unitaire * product.quantite
  return product.taux_remise ? price * (product.taux_remise / 100) : price
}

module.exports = {
  formatErrorResponse,
  getLastId,
  getOrderTotalPrice,
  getOrderProductTotalPrice
}
