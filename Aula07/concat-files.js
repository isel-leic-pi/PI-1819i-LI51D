"use strict"

// usage: node concat-files.js file.txt file1.txt file2.txt file-out.txt

const fs = require('fs')
const outputFile = process.argv[process.argv.length-1]

process.argv.slice(2, process.argv.length-1)
    .forEach(appendFile)

console.log("main code ends")


function appendFile(fileName) {
    console.log(`Start reading file ${fileName}`)
    fs.readFile(fileName, processFile)

    function processFile(err, data) {
        if(err) {
            console.log(`Error reading file ${fileName}`)
            return;
        }
        console.log(`End reading file ${fileName}`)

        fs.appendFile(outputFile, data, processAppend)
    }

    function processAppend(err) {
        if(err) {
            console.log(`Error appending file ${fileName} to ${outputFile}`)
            return
        }

        console.log(`File ${fileName} appended to ${outputFile}`)
    }
}



