/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'fournisseur',
    {
      id_fournisseur: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nom: {
        type: DataTypes.STRING(150),
        allowNull: false
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
      tableName: 'fournisseur',
      timestamps: false
    }
  )
}
