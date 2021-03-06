const PORT = 3000;
const HOST = "localhost"

var express = require('express')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')

var app = express()
var tasks_routes = require('./tasks-web-api')(express.Router())

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
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

