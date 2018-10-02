"use strict"

// usage: node watching-fs.js

const fs = require('fs')

let fsw = fs.watch(".", { persistent: true, recursive: true}, processFileChanges)

let cnt = 0;

function processFileChanges(et, path) {
    console.log(`EventType: ${et} on path ${path}`);
    console.log(`Event count ${cnt++}`)
    if(cnt === 3) {
        console.log("After 3 events I'm really tired and therefore I quit!!!")
        fsw.close()
    }

}

console.log("Main code ends...")

