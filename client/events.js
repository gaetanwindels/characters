socket.on("onNewClient", function(id, posX, posY) {
	_clients[id] = Crafty.e("Player, 2D, DOM, Text, Gravity, Collision")
    .attr({ x: posX, y: posY, w: 100, h: 90 })
    .gravity("Floor")
    .text("(°_°) <br>(___)<br>&nbsp;o&nbsp;o")
    .textFont({ size: '30px', family: 'courier' });
	console.log("Id : " + id);
});

socket.on("onLeaveClient", function() {
});

socket.on("onModifClient", function(id, x, y) {
	console.log("id " + _clients[id]);
	_clients[id].x = x;
	_clients[id].y = y;
});

socket.on("onModifWorld", function(id, x, y) {
	
});