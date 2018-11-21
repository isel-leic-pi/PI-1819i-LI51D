const PORT = 3000;
const HOST = "localhost"

var express = require('express')

var app = express()
var tasks_routes = require('./tasks-web-api')(express.Router())

app.use(measureRequestTimeMwV1)
app.use(measureRequestTimeMwV2)


app.use(express.json())

app.use('/task', tasks_routes)



app.listen(PORT, HOST, onListen)

function onListen(err) {
  if (err) {
    console.log(err)
  }
  console.log(`Serve listening on port ${PORT}. Entry point is http://${HOST}:${PORT}/`)
}


function measureRequestTimeMwV1(req, rsp, next) {
  console.log("measureRequestTimeMwV1 - replacing response.end() method")
  let start = new Date()
  let prevEnd = rsp.end;

  rsp.end = function () {
    let end = new Date();
    let timeElapsed = end.getTime() - start.getTime()
    prevEnd.apply(this, Array.prototype.slice.call(arguments))

    console.log(`measureRequestTimeMwV1 - Request took ${timeElapsed}ms`)
  }
  next();
}

function measureRequestTimeMwV2(req, rsp, next) {
  console.log("measureRequestTimeMwV2 - replacing registering on response finish event")
  let start = new Date()

  // Measuring the request time registering on response finish event
  rsp.on('finish', function () {
    let end = new Date();
    let timeElapsed = end.getTime() - start.getTime()
    console.log(`measureRequestTimeMwV2 - Request took ${timeElapsed}ms`)
  })
  next();
}
