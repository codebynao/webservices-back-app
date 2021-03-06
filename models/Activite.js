/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'activite',
    {
      id_activite: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nom: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      tableName: 'activite',
      timestamps: false
    }
  )
}
