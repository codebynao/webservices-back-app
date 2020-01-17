'use strict'

require('dotenv').config()

const Hapi = require('hapi')
const models = require('./models')
const path = require('path');
const { configureAuth } = require('./lib/auth')

// Init server
const init = async () => {
  const server = Hapi.Server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    routes: {
      cors: true
    }
  })
  await configureAuth(server)

  // Init DB connection
  await models.sequelize.sync()

  // Home route
  server.route({
    path: '/',
    method: 'GET',
    handler: function(request, h) {
      return 'Hello from Webservices API'
    }
  })

  // Routes
  await server.register([
    require('./routes/auth'),
    require('./routes/client'),
    require('./routes/ville'),
    require('./routes/commande')
  ])

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()
