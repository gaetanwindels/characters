var TILE_SIZE = 20;

//var socket = io("http://localhost:3000");

var _clients = new ClientList(100);

$(document).ready(function() {
	var _world;
	var _wm;
	var player;
	var charHolder = new CharHolder();
	Crafty.init(Config.SCREEN_WIDTH, Config.SCREEN_HEIGHT, "game");
	Crafty.clampToEntities = false;
	
	_world = new World();
	_world.create();

	charHolder.init();
	player = new Player();
    player.init(0, -50, 62, 60);
	_wm = new WorldManager(_world);
	
	Crafty.audio.add("1", "song_name.mp3");
	Crafty.audio.play("1", -1);

	for (var i=-1000; i < 1000; i++) {
		for (var j=10; j < 1002; j++) {
		    _world.replace(i, j, new Tile("#", 0, 'Green'));
		}
	}

	Crafty.e("Drawer").bind("EnterFrame", function() { _wm.drawScreen(); });

	Crafty.viewport.follow(player._entity, 0, Config.SCREEN_HEIGHT / 5);
	
	$(document).keydown(function(e) {
		if (e.keyCode === 17 || e.keyCode === 32) {
			console.log(player._entity.disableControls);
			if (player._entity.disableControls) {
				player._entity.enableControl();
			} else {
				player._entity.disableControl();
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
		var x = Math.floor((-Crafty.viewport.x + offsetX) / _world.getTileSize()); 
		var y = Math.floor((-Crafty.viewport.y + offsetY) / _world.getTileSize());
		var type = charHolder.getType();
		_world.replace(x, y, new Tile(c, type));
		_wm.drawScreen();
	});
	
	$("#game").fadeIn(800);
});