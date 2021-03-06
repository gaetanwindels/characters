//var socket = io("http://localhost:3000");

var _clients = new ClientList(100);

$(document).ready(function() {	
	$("#connectForm").submit(function() {
		$("#welcomeName").blur();
		$("#submit").blur();
		$("#loading").fadeIn(200, init);
	});
});

function init() {
	
	$("#welcome").fadeOut(0);
	name = $("#welcomeName").val();
	
	main(name);
	
	$("#game").fadeIn(800);
	$("#game").css("margin", "auto");
	
	$("#chat").css("left", $("#game").offset().left + 20);
	$("#chat").css("top", $("#game").offset().top + Crafty.viewport.height - 45);
	$("#chat").fadeIn(800);
	$("#chat").blur();
	
	$(window).resize(function() { 
		$("#chat").css("left", $("#game").offset().left + 20);
	    $("#chat").css("top", $("#game").offset().top + Crafty.viewport.height - 45);})
}

/**
 * Entry point
 */
function main(playerName) {
	var km = new KeyManager();
	var name = playerName;
	var game = GameInstance.get();
	var player = game.getPlayer();
	var charHolder = game.getCharHolder();
	var chat = new Chat();
	var clicked = false;
	var lastX, lastY;
	lastX = lastY = 0;
	
	km.load("FRENCH");
	km.init();;
	
	//Crafty.audio.add("3", "song_name.mp3");
	Crafty.audio.add("1", "build_sound.wav");
	Crafty.audio.add("2", "remove_sound.wav");
	//Crafty.audio.play("3", -1, 0.5);
	chat.init();
	
	Crafty.e("UI, Canvas, Color, 2D")
	.attr({z: 9, x:0, y:0, w: Crafty.viewport.width, h: 65})
	.color(Config.UI_COLOR)
	.bind("EnterFrame", function(e) { this.z = 8; this.attr({x:-Crafty.viewport.x, y:-Crafty.viewport.y + Crafty.viewport.height - 64 }) });
	
	Crafty.e("UIBORDER, Canvas, Color, 2D")
	.attr({z: 10, x:0, y:0, w: Crafty.viewport.width, h: 2})
	.color("Black")
	.bind("EnterFrame", function(e) { this.z = 11; this.attr({x:-Crafty.viewport.x, y:-Crafty.viewport.y + Crafty.viewport.height - 64 }) });	

	Craftory.createColorPicker();
	
	$("#game").mouseup(function(e) {
		clicked = false;
	});
	/* Event handling */
	$("#game").mousedown(function(e) {
	
		var offsetX, offsetY;
		var c = "";
		// firefox compatibility
		if(e.offsetX === undefined) {
			offsetX = e.pageX - $("#game").offset().left;
			offsetY = e.pageY - $("#game").offset().top;
		} else {
			offsetX = e.offsetX;
			offsetY = e.offsetY;
		}
		switch(e.which) {
		case 1 : 
			clicked = true;
			c = charHolder.getChar();
		break;
		case 3 : c = " "; break;
		}
		var x = Math.floor((-Crafty.viewport.x + offsetX) / game.getWorld()._w.getTileSize()); 
		var y = Math.floor((-Crafty.viewport.y + offsetY) / game.getWorld()._w.getTileSize());
		var type = charHolder.getType();
		game.getWorld().replace(x, y, new Tile(c, type, charHolder.getColor()));
		game.getWorld().drawScreen();
		Crafty.audio.play(c === " " ? "2" : "1", 1, 0.4);
		
	});
	
	$("#game").mousemove(function(e) {
		return; // only good for debugging purpose
		if (!clicked) {
			return;
		}
		var offsetX, offsetY;
		var c = "";
		// firefox compatibility
		if(e.offsetX === undefined) {
			offsetX = e.pageX - $("#game").offset().left;
			offsetY = e.pageY - $("#game").offset().top;
		} else {
			offsetX = e.offsetX;
			offsetY = e.offsetY;
		}
		switch(e.which) {
		case 1 : 
			c = charHolder.getChar();
		break;
		case 3 : c = " "; break;
		}
		var x = Math.floor((-Crafty.viewport.x + offsetX) / game.getWorld()._w.getTileSize()); 
		var y = Math.floor((-Crafty.viewport.y + offsetY) / game.getWorld()._w.getTileSize());
		
		if (x == lastX && y == lastY) {
			return;
		} else {
			lastX = x;
			lastY = y;
		}
		var type = charHolder.getType();
		game.getWorld().replace(x, y, new Tile(c, type, charHolder.getColor()));
		game.getWorld().drawScreen();
		Crafty.audio.play(c === " " ? "2" : "1", 1, 0.4);
	});
	
	$(document).keydown(function(e) {
		if (e.keyCode === 13) {
			chat.toggle();
			if (!chat.isActive()) {
			    chat.addMessage($("#chat").val(), name);
				$("#chat").val("")
				if (charHolder._entity._textFont.type !== "bold") {
				    player.enableControl();
			    }
		    } else {
		    	player.disableControl();
		    }
		}
		
		if ($("#chat").is(":focus") || e.keyCode === 13 ) {
			return;
		}
		
		if (e.keyCode === 17 || e.keyCode === 32) {
			if (player.disableControls) {
				player.enableControl();
			} else {
				player.disableControl();
			}
			charHolder.toggle();
		} else {
			charHolder.setChar(km.getChar(e));
		}
		Crafty.viewport.reload();
	});
	
	$("#loading").css("display", "none");
}