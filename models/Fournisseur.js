'use strict'

module.exports = (sequelize, DataTypes) => {
  const Fournisseur = sequelize.define(
    'fournisseur',
    {
      id_fournisseur: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      id_ville: {
        type: DataTypes.BIGINT(20)
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Fournisseur
}
