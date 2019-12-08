'use strict'

module.exports = (sequelize, DataTypes) => {
  const ProduitCategorie = sequelize.define(
    'produit_categorie',
    {
      id_categorie: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      id_produit: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return ProduitCategorie
}
