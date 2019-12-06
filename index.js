'use strict'

require('dotenv').config()

const Hapi = require('hapi')

// Init server
const init = async () => {
  const server = Hapi.Server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000
  })

  // Init DB connection
  require('./lib/dbConnection')()

  // Import routes
  server.route({
    path: '/',
    method: 'GET',
    handler: function(request, h) {
      return 'Hello hapi'
    }
  })

  // ROUTING PLUGIN
  // await server.register([require('./routes/user')])

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()
