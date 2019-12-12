/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'livraison',
    {
      id_livraison: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      mode: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      date_livraison: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      id_facture: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'facture',
          key: 'id_facture'
        },
        unique: true
      }
    },
    {
      tableName: 'livraison',
      timestamps: false
    }
  )
}
