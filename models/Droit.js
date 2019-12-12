/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'droit',
    {
      chemin: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
      },
      id_user: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id_user'
        }
      },
      type_droit: {
        type: "SET('LECTURE','ECRITURE')",
        allowNull: true
      }
    },
    {
      tableName: 'droit',
      timestamps: false
    }
  )
}
