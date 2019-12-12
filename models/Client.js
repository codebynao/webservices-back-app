/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'client',
    {
      id_client: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nom: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      prenom: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      adresse: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      date_naissance: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      civilite: {
        type: DataTypes.CHAR(1),
        allowNull: true
      },
      numero: {
        type: DataTypes.CHAR(5),
        allowNull: false,
        unique: true
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
      tableName: 'client',
      timestamps: false
    }
  )
}
