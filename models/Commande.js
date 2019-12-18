/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'commande',
    {
      id_commande: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      date_commande: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      numero: {
        type: DataTypes.CHAR(5),
        allowNull: false,
        unique: true
      },
      id_client: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'client',
          key: 'id_client'
        }
      },
      is_deleted: {
        type: DataTypes.TINYINT,
        default: 0
      }
    },
    {
      tableName: 'commande',
      timestamps: false
    }
  )
}
