'use strict'

module.exports = (sequelize, DataTypes) => {
  const Paiement = sequelize.define(
    'paiement',
    {
      id_paiement: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      type_paiement: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      date_paiement: {
        type: DataTypes.DATE
      },
      id_facture: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Paiement
}
