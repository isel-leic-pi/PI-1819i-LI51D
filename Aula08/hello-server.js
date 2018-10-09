"use strict"
const PORT = 1904;
const net = require('net')

const server = net.createServer();
server.on('connection', onClientConnect)
server.on('error', serverError)
server.listen(PORT, serverListening)

console.log("main code ended")

function onClientConnect(c) {
    console.log("Client connected!")

    c.on('data', onClientData)
    c.on('end', () => console.log('Client disconnected'));


    function onClientData(data) {
        data = data.toString();
        console.log(`Client sent ${data}`)
        c.write(`Hello ${data}`)
    }
}




function serverError(err){ 
    console.log(`Error listening on ${PORT}. Cause: ${err}`)
    return
}



function serverListening() {
    console.log(`Server listening on ${PORT}. `)
}
