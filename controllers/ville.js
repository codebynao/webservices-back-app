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

  async getCityById(req, h) {
    try {
      const city = await VilleModel.findByPk(req.params.id, { raw: true })

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

  async getCityByZipcode(req, h) {
    try {
      const city = await VilleModel.findOne({
        where: {
          code_postal: req.params.zipcode
        },
        raw: true
      })

      if (!city) {
        return lib.formatErrorResponse(
          404,
          `La ville ayant le code postal ${req.params.zipcode} est introuvable`,
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

  async createCity(req, h) {
    try {
      const city = await VilleModel.findOne({
        where: { code_postal: req.payload.code_postal }
      })

      if (city) {
        return lib.formatErrorResponse(
          404,
          `La ville ayant le code postal ${req.params.zipcode} existe déjà`,
          true
        )
      }

      const id_ville = await lib.getLastId(VilleModel, 'id_ville')

      const createdCity = await VilleModel.create({
        id_ville,
        nom: req.payload.nom,
        code_postal: req.payload.code_postal,
        code_pays: req.payload.code_pays,
        ...(req.payload.id_maire && { id_maire: req.payload.id_maire })
      })

      return {
        code: 201,
        data: createdCity
      }
    } catch (error) {
      return lib.formatErrorResponse(500, error)
    }
  }
}

module.exports = new Ville()
