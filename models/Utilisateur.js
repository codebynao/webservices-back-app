'use strict'

module.exports = (sequelize, DataTypes) => {
  const Utilisateur = sequelize.define(
    'utilisateur',
    {
      id_client: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      login: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      actif: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Utilisateur
}
