'use strict'

/**
 * Format the error response and log it
 * @param {Number} code
 * @param {Object|String} error
 * @param {Boolean} isWarning
 * @returns {Object}
 */
const formatErrorResponse = (code, error, isWarning = false) => {
  if (isWarning) {
    console.warn(error)
  } else {
    console.error(error)
  }

  return {
    code,
    data: null,
    error: error.message || error
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

module.exports = {
  formatErrorResponse,
  getLastId
}
