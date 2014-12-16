var TILE_SIZE = 20;

//var socket = io("http://localhost:3000");

var _clients = new ClientList(100);

$(document).ready(function() {
	var game = GameInstance.get();
	var player = game.getPlayer();
	var charHolder = game.getCharHolder();
	
	
	Crafty.audio.add("1", "song_name.mp3");
	//Crafty.audio.play("1", -1);

	//Crafty.e("Drawer").bind("EnterFrame", function() { game.getWorld().drawScreen(); });

	
	$(document).keydown(function(e) {
		if (e.keyCode === 17 || e.keyCode === 32) {
			console.log(player.disableControls);
			if (player.disableControls) {
				player.enableControl();
			} else {
				player.disableControl();
			}
			charHolder.toggle();
		} else {
			charHolder.setChar(e);
		}
	});

	$("#game").mousedown(function(e) {
		var offsetX, offsetY;
		// firefox compatibility
		if(e.offsetX === undefined) {
			offsetX = e.pageX - $("#game").offset().left;
			offsetY = e.pageY - $("#game").offset().top;
		} else {
			offsetX = e.offsetX;
			offsetY = e.offsetY;
		}
		var c = "";
		switch(e.which) {
		case 1 : 
			c = charHolder.getChar();
		break;
		case 3 : c = " "; break;
		}
		var x = Math.floor((-Crafty.viewport.x + offsetX) / game.getWorld()._w.getTileSize()); 
		var y = Math.floor((-Crafty.viewport.y + offsetY) / game.getWorld()._w.getTileSize());
		var type = charHolder.getType();
		game.getWorld().replace(x, y, new Tile(c, type));
		game.getWorld().drawScreen();
	});
	
	$("#game").fadeIn(800);
});