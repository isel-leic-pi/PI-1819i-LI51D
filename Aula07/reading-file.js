"use strict"

// usage: node reading-file.js

const fs = require('fs')

const fileName = 'file2.txt'


fs.open(fileName, 'r', processOpen)


function processOpen(err, fd)  {
    if(err){
        console.error(err)
        return;
    }

    fs.readFile(fd, processRead)
}

function processRead(err, data)  {
    if(err){
        console.error(err)
        return;
    }
   console.log(data.toString())
}


