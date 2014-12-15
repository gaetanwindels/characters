var express = require("express"),
app = express();
server = require('http').createServer(app),
_socket = require('socket.io').listen(server);
var World = require('../common/world');

console.log(plop.foo);

server.listen(3000);

var _count = 0;
var _clients = new Array(100);
var _world = new Array(100);

//generating world
for(var i=0; i<_world.length; i++) {
	_world[i] = new Array(100);
}

for(var i=0; i<100;i++) {
	_world[i][5] = '#';
}	


_socket.on('connection', function(clientSocket) {
	var id = clientSocket.id;
	_clients[_count++] = { 'x' : 60, 'y' : 60};
	console.log('New user connected. Count : ' + _count);
	clientSocket.on('disconnect', function(clientSocket){  console.log('A user disconnected. Count : ' + --_count); });

	clientSocket.emit('onConnect', _world, _clients, _count);
	clientSocket.emit('createPlayer', 60, 60);
	clientSocket.broadcast.emit('onNewClient', _count);

	clientSocket.on('move', function(x, y) {
		console.log("A user moved " + x + ";" + y);
		clientSocket.broadcast.emit('onModifClient', _count, x, y);
	});
});

