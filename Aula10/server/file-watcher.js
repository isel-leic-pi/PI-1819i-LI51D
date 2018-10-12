"use strict"

module.exports = function (path) {
    const fs = require('fs')
    const EventEmitter = require('events')

    
    // function MyEventEmmiter() {
    //     EventEmitter.call(this)
    // }

    // MyEventEmmiter.prototype = new EventEmitter()

    class MyEventEmmiter extends EventEmitter {
        constructor() {
            super()
            let fsw = fs.watch(
                path,
                { persistent: true, recursive: true },
                processFileChanges
            )

            var seferovic = this;

            function processFileChanges(et, path) {

                const msg = {eventType: et, file: path, timestamp: Date.now()};
                console.log(msg);
        
                seferovic.emit('modify', msg)
                
            }
        }
    }

    return new MyEventEmmiter()

}

