
var path = require('path')
var express = require('express')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var app = express()

var config = require('./tasks-config.json')

let PORT = config.port;
let HOST = config.host;

var tasks_db = require('./dataAccess/tasks-db')(config.es)
var tasks_service = require('./model/tasks-service')(tasks_db)
var tasks_routes = require('./api/tasks-web-api')(express.Router(), tasks_service)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use('/files/', express.static(path.join(__dirname, "public")))
app.use('/task', tasks_routes)


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

