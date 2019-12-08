'use strict'

module.exports = (sequelize, DataTypes) => {
  const Responsable = sequelize.define(
    'responsable',
    {
      id_responsable: {
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
      id_service: {
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

  return Responsable
}
