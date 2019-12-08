'use strict'

module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'service',
    {
      id_service: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      id_activite: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true
      },
      id_responsable: {
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

  return Service
}
