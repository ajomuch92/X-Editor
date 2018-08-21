const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const auth = require('@feathersjs/authentication-client');

const socket = io('http://localhost:3030/');
const client = feathers();
client.configure(socketio(socket));
client.configure(auth({
    storage: window.localStorage
}));

exports.client = client;