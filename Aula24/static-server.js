
var path = require('path')
var express = require('express')
var morgan = require('morgan')
var app = express()

let PORT = 3000;
let HOST = "localhost";


app.use(morgan('dev'))
app.use('/', express.static(path.join(__dirname, "public")))


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

