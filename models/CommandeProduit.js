'use strict'

module.exports = (sequelize, DataTypes) => {
  const CommandeProduit = sequelize.define(
    'commande_produit',
    {
      id_produit: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      id_commande: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      quantite: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      prix_unitaire: {
        type: DataTypes.DECIMAL(15, 0)
      },
      taux_remise: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return CommandeProduit
}
