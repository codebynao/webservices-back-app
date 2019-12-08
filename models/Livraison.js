'use strict'

module.exports = (sequelize, DataTypes) => {
  const Livraison = sequelize.define(
    'livraison',
    {
      id_livraison: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      mode: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      date_livraison: {
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

  return Livraison
}
