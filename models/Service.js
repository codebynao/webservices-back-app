/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'service',
    {
      id_service: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nom: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      id_activite: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'activite',
          key: 'id_activite'
        },
        unique: true
      }
    },
    {
      tableName: 'service',
      timestamps: false
    }
  )
}
