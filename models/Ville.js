'use strict'

module.exports = (sequelize, DataTypes) => {
  const Ville = sequelize.define(
    'ville',
    {
      id_ville: {
        type: DataTypes.BIGINT(20),
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      code_postal: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      code_pays: {
        type: DataTypes.CHAR(2)
      },
      id_maire: {
        type: DataTypes.INTEGER(11),
        unique: true
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Ville
}
