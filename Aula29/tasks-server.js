'use strict'

class Routers {
  constructor() {
    this.global  = express.Router()
    this.specific  = express.Router()
  }
}


var path = require('path')
var express = require('express')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var app = express()

var config = require('./tasks-config.json')

let PORT = config.port;
let HOST = config.host;

var tasks_db = require('./dataAccess/tasks-db')(config.es)
var auth_db = require('./dataAccess/auth-db')(config.es)
var tasks_service = require('./model/tasks-service')(tasks_db)
var auth_service = require('./model/auth-service')(auth_db)

var auth_routes = require('./api/auth-web-api')(new Routers(), auth_service)
var tasks_routes = require('./api/tasks-web-api')(new Routers(), tasks_service)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use('/', express.static(path.join(__dirname, "dist")))

app.use(tasks_routes.global)
app.use('/api/tasks', tasks_routes.specific)

app.use(auth_routes.global)
app.use('/api/auth', auth_routes.specific)


app.listen(PORT, HOST, onListen)

function onListen(err) {
  if (err) {
    console.log(err)
  }
  console.log(`Serve listening on port ${PORT}. Entry point is http://${HOST}:${PORT}/`)
}


function showRequest(req, rsp) {
  console.log(`${req.method} - ${req.url}`)
  next()
}



