'use strict'

const Sequelize = require('sequelize')

module.exports = function() {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql'
    }
  )

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
    })
}
