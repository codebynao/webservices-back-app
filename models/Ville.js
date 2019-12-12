/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'ville',
    {
      id_ville: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nom: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      code_postal: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
      },
      code_pays: {
        type: DataTypes.CHAR(2),
        allowNull: true,
        references: {
          model: 'pays',
          key: 'code_pays'
        }
      }
    },
    {
      tableName: 'ville',
      timestamps: false
    }
  )
}
