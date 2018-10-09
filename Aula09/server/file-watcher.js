"use strict"

module.exports = function (path, cb) {
    const fs = require('fs')

    let fsw = fs.watch(
        path,
        { persistent: true, recursive: true },
        processFileChanges
    )


    function processFileChanges(et, path) {
        const msg = `EventType: ${et} on path ${path}`;
        console.log(msg);
        
        cb(msg);
    }

}

