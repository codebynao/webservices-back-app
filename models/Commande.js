'use strict'

module.exports = (sequelize, DataTypes) => {
  const Commande = sequelize.define(
    'commande',
    {
      id_commande: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      date_commande: {
        type: DataTypes.DATE,
        allowNull: false
      },
      numero: {
        type: DataTypes.CHAR(5),
        allowNull: false,
        unique: true
      },
      id_client: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Commande
}
