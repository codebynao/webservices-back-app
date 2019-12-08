'use strict'

const Models = require('../models')
const VilleModel = Models.ville
const lib = require('../lib')

class Ville {
  async getAllCities(req, h) {
    try {
      const cities = await VilleModel.findAll({ raw: true })

      return {
        code: 200,
        data: cities
      }
    } catch (error) {
      return lib.formatErrorResponse(500, error)
    }
  }

  async getCity(req, h) {
    try {
      const city = await VilleModel.findOne({
        where: { id_ville: req.params.id },
        raw: true
      })

      if (!city) {
        return lib.formatErrorResponse(
          404,
          `La ville ayant l'identifiant ${req.params.id} est introuvable`,
          true
        )
      }

      return {
        code: 200,
        data: city
      }
    } catch (error) {
      return lib.formatErrorResponse(500, error)
    }
  }
}

module.exports = new Ville()
