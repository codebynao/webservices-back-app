'use strict'

module.exports = (sequelize, DataTypes) => {
  const Societe = sequelize.define(
    'societe',
    {
      id_societe: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING(250)
      },
      complement_nom: {
        type: DataTypes.STRING(250)
      },
      telephone: {
        type: DataTypes.STRING(25)
      },
      adresse: {
        type: DataTypes.STRING(255)
      },
      mail: {
        type: DataTypes.STRING(150)
      },
      id_ville: {
        type: DataTypes.BIGINT(11)
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Societe
}
