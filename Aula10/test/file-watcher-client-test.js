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
    it('should emit a message event from a two data events', done => {
        client.on('message', message => {
            assert.deepEqual(message, { foo: 'bar' });
            done();
        });
        stream.emit('data', '{"foo":"b');
        stream.emit('data', 'ar"}\n');
    });

    it('should emit a two message events from a single data event', done => {
        let count = 0;
        client.on('message', message => {
            assert.deepEqual(message, { foo: 'bar' });
            if(++count == 2)
                done();
        });
        stream.emit('data', '{"foo":"bar"}\n{"foo":"bar"}\n');
    });
});
