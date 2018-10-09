"use strict"
const PORT = 1904;
const net = require('net')

const client = net.createConnection({ port: PORT }, () => {
    // 'connect' listener
    console.log(`connected to server on port ${PORT}!`);
    client.write('SLB!\r\n');
  });

  client.on('data', onServerData)

  function onServerData(data) {
    data = data.toString();
    console.log(`Server sent ${data}`)
}