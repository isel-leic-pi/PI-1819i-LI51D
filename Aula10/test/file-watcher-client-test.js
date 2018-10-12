'use strict';
const assert = require('assert');

const EventEmitter = require('events').EventEmitter; 
const LdjMessages = require('../common/ldj-messages');


describe('LdjMessages', () => {
    let stream = null;
    let client = null;
    beforeEach(() => {
        stream = new EventEmitter();
        client = new LdjMessages(stream);
    });
    it('should emit a message event from a single data event', done => {
        client.on('message', message => {
            assert.deepEqual(message, { foo: 'bar' });
            done();
        });
        stream.emit('data', '{"foo":"bar"}\n');
    });
});
