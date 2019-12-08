'use strict'

module.exports = (sequelize, DataTypes) => {
  const Maire = sequelize.define(
    'maire',
    {
      id_maire: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      prenom: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      id_ville: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        unique: true
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Maire
}
