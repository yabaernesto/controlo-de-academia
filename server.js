const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()

// permitir com que o express receba dados da request body
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(routes)

// configurar template engine
server.set('view engine', 'njk')

nunjucks.configure('views', {
   express: server,
   autoescape: false,
   noCache: true
})

server.listen(5000, () => {
   console.log('server is running!')
})