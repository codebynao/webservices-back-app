/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'categorie',
    {
      id_categorie: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nom: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      tableName: 'categorie',
      timestamps: false
    }
  )
}
