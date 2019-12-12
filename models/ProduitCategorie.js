/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'produit_categorie',
    {
      id_categorie: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'categorie',
          key: 'id_categorie'
        }
      },
      id_produit: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'produit',
          key: 'id_produit'
        }
      }
    },
    {
      tableName: 'produit_categorie',
      timestamps: false
    }
  )
}
