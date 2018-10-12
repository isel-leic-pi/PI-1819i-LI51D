
const PORT = 1904
const net = require('net')

const PATH_MONITORED = '../'
var fw = require('./file-watcher')(PATH_MONITORED)
const LdjMessages = require('../common/ldj-messages')

fw.on('modify', notifyClients)
fw.on('modify', console.log)

Object.prototype.toLdj = function() {
    return JSON.stringify(this) + '\n'
}


let clients = []

const server = net.createServer()
server.on('connection', onClientConnect)
server.on('error', serverError)
server.listen(PORT, serverListening)

console.log('main code ended')

function onClientConnect(sc) {
    clients.push(sc)
    console.log(`Client connected! - ${clients.length}`)

    LdjMessages.create(sc).on('message', onClientData)

    //sc.on('data', onClientData)
    sc.on('end', onClientDisconnect)


    function onClientData(helloMsg) {
        if(helloMsg.type != 'hello') {
            console.log('Not polite clientes are simply kicked!')
            sc.end()
            return
        }
        console.log(`Client sent ${helloMsg.message}`)
        sc.write({type: 'watching', path: PATH_MONITORED}.toLdj())
    }

    function onClientDisconnect() {

        let idx = clients.indexOf(sc);
        console.log(`idx of disconnecting client: ${idx}`)
        clients.splice(idx, 1)
        console.log(`clients array:`)
        console.log(clients)
        console.log(`Client disconnected! - ${clients.length}`)
    }
}

function serverError(err) {
    console.log(`Error listening on ${PORT}. Cause: ${err}`)
    return
}

function serverListening() {
    console.log(`Server listening on ${PORT}. `)
}

// -----------------------------------


function notifyClients(msg) {
    msg.type = 'changing'
    clients.forEach(notifyClient)
    function notifyClient(sc) {
        let str = msg.toLdj()
        const str1 = str.substring(0, str.length/2)
        const str2 = str.substring(str.length/2+1, str.length)
        
        sendStr(str1)
    
        setTimeout(() => sendStr(str2),10)


        function sendStr(str) { 
            console.log(`sending str ${str}`)
            sc.write(str)
        }
        
    }
}