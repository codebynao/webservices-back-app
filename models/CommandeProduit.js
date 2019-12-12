/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'commande_produit',
    {
      id_produit: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'produit',
          key: 'id_produit'
        }
      },
      id_commande: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'commande',
          key: 'id_commande'
        }
      },
      quantite: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      prix_unitaire: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      taux_remise: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      }
    },
    {
      tableName: 'commande_produit',
      timestamps: false
    }
  )
}
