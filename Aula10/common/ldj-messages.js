const EventEmitter = require('events')


class LdjMessages extends EventEmitter {
    constructor(dataEmitter) {
        super();
        dataEmitter.on('data', processData)
        
        let buffer = "";
        const self = this;
        
        function processData(data) {
            //console.log(`Received message ${data}`)
            buffer += data.toString();
            
            let idx = buffer.indexOf('\n');
            while(idx != -1) {
                var input = buffer.substring(0, idx);
                self.emit('message', JSON.parse(input));

                buffer = buffer.substring(idx+1);
                idx = buffer.indexOf('\n');
            }
        }
    }

    static create(dataEmitter) {
        return new LdjMessages(dataEmitter)
    }
}

module.exports = LdjMessages;


