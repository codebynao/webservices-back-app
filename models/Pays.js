'use strict'

module.exports = (sequelize, DataTypes) => {
  const Pays = sequelize.define(
    'pays',
    {
      code_pays: {
        type: DataTypes.CHAR(2),
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING(150),
        allowNull: false
      }
    },
    {
      freezeTableName: true, // Avoid changing the table name to plural
      timestamps: false // ignore createdAt and updatedAt
    }
  )

  return Pays
}
