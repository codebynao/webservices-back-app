'use strict'

module.exports = (sequelize, DataTypes) => {
  const Facture = sequelize.define(
    'facture',
    {
      id_facture: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      date_facture: {
        type: DataTypes.DATE
      },
      numero: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      id_commande: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true
      },
      id_paiement: {
        type: DataTypes.INTEGER(11),
        unique: true
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Facture
}
