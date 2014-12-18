/**
 * A factory meant to produce crafty entities
 */

var Craftory = {};

Craftory.createPlayer = function(xPos, yPos, width, height) {
	var player = Crafty.e("Player, 2D, DOM, Color, Text, Twoway, Collision, Gravity")
	.gravity("Floor")
	.attr({ x: xPos, y: yPos, w: width, h: height })
	.twoway(4, 20)
	.speed({ x:1, y:4})
	.color('White')
	.text("&nbsp;&nbsp;&nbsp;&nbsp;__<br>&nbsp;&nbsp;&nbsp;| ''|<br>&nbsp;/[__]\\<br>&nbsp;&nbsp;&nbsp;l&nbsp;&nbsp;&nbsp;l").unselectable()
	.textFont({ size: '1em', family: 'arial', type: "bold" })
	.bind("NewDirection", function(dir) {
		if (this.disableControls) {
			return;
		}
		if (dir.x > 0 && dir.y < 0) { 
			this.text("&nbsp;&nbsp;&nbsp;&nbsp;__<br>&nbsp;&nbsp;&nbsp;| ''|/<br>&nbsp;/[__]<br>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;/"); 
		}
		if (dir.x < 0 && dir.y < 0) { 
			this.text("&nbsp;&nbsp;&nbsp;&nbsp;__<br>&nbsp;&nbsp;\\|'' |<br>&nbsp;&nbsp;[__]\\<br>&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;\\"); 
		}
		if (dir.x > 0 && dir.y == 0) { 
			this.text("&nbsp;&nbsp;&nbsp;&nbsp;__<br>&nbsp;&nbsp;&nbsp;| ''|<br>&nbsp;/[__]\\<br>&nbsp;&nbsp;&nbsp;l&nbsp;&nbsp;&nbsp;l"); 
		} 
		if (dir.x < 0 && dir.y == 0) {
			this.text("&nbsp;&nbsp;&nbsp;&nbsp;__<br>&nbsp;&nbsp;&nbsp;|'' |<br>&nbsp;/[__]\\<br>&nbsp;&nbsp;&nbsp;l&nbsp;&nbsp;&nbsp;l&nbsp;"); 
		}; 
		})
		.onHit("Tile", function(ent) {
			for (var i=0; i < ent.length; i++) {
				var obj = ent[i].obj;
				if (this._direction.x == 0 && this._direction.y == 0) {
					this.y = obj.y - this._h;
				}
				if (this._direction.x > 0 && obj.intersect(this.x, this.y - this._direction.y, this._w, this._h)) {
					this.y -= obj._h;
					if (this.hit("Tile")) {
						this.y += obj._h; // can't go up
						this.x -= Math.abs(obj.x - (this.x + this._w));
					} else { // smooth transition
						//this.y += (obj._h - this._speed.y / 2);
						//this.x -= (this._speed.x / 2);
					}
				}
				if (this._direction.x < 0 && obj.intersect(this.x, this.y - this._direction.y, this._w, this._h)) {
					this.y -= obj._h;
					if (this.hit("Tile")) {
						this.y += obj._h;
						this.x += Math.abs((obj.x + obj._w) - this.x);
					}
				}
				if (this._direction.y < 0 && obj.intersect(this.x - this._direction.x, this.y, this._w, this._h)) {
					this.y += Math.abs((obj.y + obj._h) - this.y);
				}
			}
		}).bind("NewDirection", function(dir) { this._direction = dir; });
	return player;
}

Craftory.createColorPicker = function() {
	var x = Crafty.viewport.width / 2 +  GameInstance.get().getCharHolder()._entity._w / 2;
	var y = Crafty.viewport.height;
	var size = 20;
	var xPos = [x+size, x+size, x+size, x+size*2, x+size*2, x+size*2, x+size*3, x+size*3, x+size*3, x+size*4, x+size*4, x+size*4];
	var yPos = [y-size, y-size*2, y-size*3, y-size, y-size*2, y-size*3, y-size, y-size*2, y-size*3, y-size, y-size*2, y-size*3];
	var colors = ["#FF0000", "#0000FF", "#00FF00", "#ff00ff", "black", "grey", "brown", "#ff9933", "yellow", "#0099ff", "#ffccff", "#006600"];

	for (var i = 0; i < xPos.length; i++) {
		Craftory.createColor(colors[i], xPos[i], yPos[i]);
	}
};


Craftory.createColor = function(color, xScreen, yScreen) {
	var e = Crafty.e("ColorPicker, 2D, Canvas, Mouse, Color")
	.attr({x: -Crafty.viewport.x + xScreen, y:-Crafty.viewport.y + yScreen, w:20, h:20})
	.color(color)
	.bind("EnterFrame", function(e) { this.z = 10; this.attr({x: -Crafty.viewport.x + xScreen, y:-Crafty.viewport.y + yScreen}) } )
	.bind("MouseDown", function(e) { GameInstance.get().getCharHolder().setColor(color); });
};
