/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id_user: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      login: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      nom: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      prenom: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      profil: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      tableName: 'user',
      timestamps: false
    }
  )
}
