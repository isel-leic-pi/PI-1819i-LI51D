"use strict"
const PORT = 1904;
const net = require('net')
let clients = [];

const server = net.createServer();
server.on('connection', onClientConnect)
server.on('error', serverError)
server.listen(PORT, serverListening)

console.log("main code ended")



function onClientConnect(sc) {
    clients.push(sc)
    console.log(`Client connected! - ${clients.length}`)

    sc.on('data', onClientData)
    sc.on('end', onClientDisconnect);


    function onClientData(data) {
        data = data.toString();
        console.log(`Client sent ${data}`)
        sc.write(`Hello ${data}`)
    }

    function onClientDisconnect() {
        let idx = clients.indexOf(sc);
        clients = clients.splice(idx, 1)
        console.log(`Client disconnected! - ${clients.length}`)
    }
}




function serverError(err){ 
    console.log(`Error listening on ${PORT}. Cause: ${err}`)
    return
}



function serverListening() {
    console.log(`Server listening on ${PORT}. `)
}

// -----------------------------------
const fs = require('fs')

let fsw = fs.watch(".", { persistent: true, recursive: true}, processFileChanges)


function processFileChanges(et, path) {
    const msg = `EventType: ${et} on path ${path}`;
    console.log(msg);
    clients.forEach(notifyClient);

    function notifyClient(sc) {
        sc.write(msg)
    }

}
