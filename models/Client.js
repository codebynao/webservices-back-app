'use strict'

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'client',
    {
      id_client: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      adresse: {
        type: DataTypes.STRING
      },
      date_naissance: {
        type: DataTypes.STRING
      },
      civilite: {
        type: DataTypes.STRING
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false
      },
      id_ville: {
        type: DataTypes.BIGINT
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Client
}
