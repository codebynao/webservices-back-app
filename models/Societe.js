/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'societe',
    {
      id_societe: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nom: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      complement_nom: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      telephone: {
        type: DataTypes.STRING(25),
        allowNull: true
      },
      adresse: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      mail: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      id_ville: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'ville',
          key: 'id_ville'
        }
      }
    },
    {
      tableName: 'societe',
      timestamps: false
    }
  )
}
