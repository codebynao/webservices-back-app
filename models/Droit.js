'use strict'

module.exports = (sequelize, DataTypes) => {
  const Droit = sequelize.define(
    'droit',
    {
      chemin: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      id_user: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      type_droit: {
        type: DataTypes.STRING
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Droit
}
