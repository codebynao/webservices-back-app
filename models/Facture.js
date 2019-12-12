/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'facture',
    {
      id_facture: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      date_facture: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      numero: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      id_commande: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'commande',
          key: 'id_commande'
        },
        unique: true
      },
      id_paiement: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'paiement',
          key: 'id_paiement'
        },
        unique: true
      }
    },
    {
      tableName: 'facture',
      timestamps: false
    }
  )
}
