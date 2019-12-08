'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id_user: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      login: {
        type: DataTypes.STRING(255)
      },
      nom: {
        type: DataTypes.STRING(255)
      },
      password: {
        type: DataTypes.STRING(255)
      },
      prenom: {
        type: DataTypes.STRING(255)
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      profil: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return User
}
