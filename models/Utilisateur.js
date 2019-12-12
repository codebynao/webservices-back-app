/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'utilisateur',
    {
      id_client: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'client',
          key: 'id_client'
        }
      },
      login: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      actif: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      }
    },
    {
      tableName: 'utilisateur',
      timestamps: false
    }
  )
}
