'use strict'

module.exports = (sequelize, DataTypes) => {
  const Produit = sequelize.define(
    'produit',
    {
      id_produit: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      libelle: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      prix_unitaire: {
        type: DataTypes.DECIMAL(15, 3),
        allowNull: false
      },
      reference: {
        type: DataTypes.CHAR(8),
        allowNull: false,
        unique: true
      },
      id_fournisseur: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Produit
}
