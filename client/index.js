var TILE_SIZE = 20;

//var socket = io("http://localhost:3000");

var _clients = new ClientList(100);

$(document).ready(function() {
	var game = GameInstance.get();
	var player = game.getPlayer();
	var charHolder = game.getCharHolder();
	
	Craftory.createColorPicker();
	
	
	Crafty.audio.add("1", "song_name.mp3");
	//Crafty.audio.play("1", -1);
	var bla = Crafty.e("bla, Color, 2D, DOM")
	.attr({x:0, y:0, w: Crafty.viewport.width, h: charHolder._entity._h})
	.color("White")
	.css({ borderTop: "2px black solid" })
	.bind("EnterFrame", function(e) { this.attr({x:-Crafty.viewport.x, y:-Crafty.viewport.y + Crafty.viewport.height - this._h }) });	


	
	$(document).keydown(function(e) {
		if (e.keyCode === 16) {
			charHolder._shifted = true;
		} else if (e.keyCode === 17 || e.keyCode === 32) {
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
	
	$(document).keyup(function(e) {
		if (e.keyCode === 16) {
			charHolder._shifted = false;
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
		game.getWorld().replace(x, y, new Tile(c, type, charHolder.getColor()));
		game.getWorld().drawScreen();
	});
	
	$("#game").fadeIn(800);
});