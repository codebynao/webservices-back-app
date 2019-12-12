/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'produit',
    {
      id_produit: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      libelle: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      prix_unitaire: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      reference: {
        type: DataTypes.CHAR(8),
        allowNull: false,
        unique: true
      },
      id_fournisseur: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'fournisseur',
          key: 'id_fournisseur'
        }
      }
    },
    {
      tableName: 'produit',
      timestamps: false
    }
  )
}
