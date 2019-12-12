/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'responsable',
    {
      id_responsable: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
        references: {
          model: 'service',
          key: 'id_service'
        },
        unique: true
      }
    },
    {
      tableName: 'responsable',
      timestamps: false
    }
  )
}
