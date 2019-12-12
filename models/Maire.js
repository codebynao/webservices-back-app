/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'maire',
    {
      id_maire: {
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
      id_ville: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'ville',
          key: 'id_ville'
        },
        unique: true
      }
    },
    {
      tableName: 'maire',
      timestamps: false
    }
  )
}
