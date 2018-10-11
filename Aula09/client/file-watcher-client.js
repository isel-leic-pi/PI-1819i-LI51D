"use strict"
const PORT = 1904;
const net = require('net')
const LdjMessages = require('../common/ldj-messages')




const client = net.createConnection({ port: PORT }, () => {
    // 'connect' listener
    console.log(`connected to server on port ${PORT}!`);

    client.write(JSON.stringify({type: 'hello', message: "SLB"}) + '\n');
  });

  const ldj = new LdjMessages(client)
  ldj.on('message', onServerMessage)

  function onServerMessage(message) {
    console.log(`Server message: `)
    console.log(message)
}