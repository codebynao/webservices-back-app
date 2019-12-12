/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'pays',
    {
      code_pays: {
        type: DataTypes.CHAR(2),
        allowNull: false,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING(150),
        allowNull: false
      }
    },
    {
      tableName: 'pays',
      timestamps: false
    }
  )
}
