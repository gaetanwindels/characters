/**
 * A factory meant to produce crafty entities
 */

var Craftory = {};

Craftory.createPlayer = function(xPos, yPos, width, height) {
	var player = Crafty.e("Player, 2D, DOM, Color, Text, Multiway, Collision, Gravity")
	.gravity("Floor")
	.attr({ x: xPos, y: yPos, w: width, h: height })
	.multiway(6, { Z:-90, D:0, Q:-180})
	.color('White')
	.text("[o_o]<br>/|1|\\<br>&nbsp;o&nbsp;o").unselectable()
	.textFont({ size: '18px', family: 'Lucida Console' })
	.onHit("Tile", function(ent) { 
		for (var i=0; i < ent.length; i++) {
			var obj = ent[i].obj;
			if (this._direction.x == 0 && this._direction.y == 0) {
				this.y = obj.y - this._h;
			}
			if (this._direction.x > 0 && obj.intersect(this.x, this.y - this._direction.y, this._w, this._h)) {
				this.y -= obj._h;
				if (this.hit("Tile")) {
					this.y += obj._h;
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
				} else { // smooth transition
					//this.y += (obj._h - this._speed.y / 2);
					//this.x += (this._speed.x / 2);
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
	Craftory.createColor("red", Crafty.viewport.width / 2 - 72, Crafty.viewport.height - 20 * 3);
	Craftory.createColor("blue", Crafty.viewport.width / 2 - 92, Crafty.viewport.height - 20 * 3);
	Craftory.createColor("green", Crafty.viewport.width / 2 - 112, Crafty.viewport.height - 20 * 3);
	Craftory.createColor("black", Crafty.viewport.width / 2 - 132, Crafty.viewport.height - 20 * 3);
	
	Craftory.createColor("red", Crafty.viewport.width / 2 - 72, Crafty.viewport.height - 20 * 2);
	Craftory.createColor("blue", Crafty.viewport.width / 2 - 92, Crafty.viewport.height - 20 * 2);
	Craftory.createColor("green", Crafty.viewport.width / 2 - 112, Crafty.viewport.height - 20 * 2);
	Craftory.createColor("black", Crafty.viewport.width / 2 - 132, Crafty.viewport.height - 20 * 2);
	
	Craftory.createColor("yellow", Crafty.viewport.width / 2 - 72, Crafty.viewport.height - 20);
	Craftory.createColor("orange", Crafty.viewport.width / 2 - 92, Crafty.viewport.height - 20);
	Craftory.createColor("brown", Crafty.viewport.width / 2 - 112, Crafty.viewport.height - 20);
	Craftory.createColor("pink", Crafty.viewport.width / 2 - 132, Crafty.viewport.height - 20);
};


Craftory.createColor = function(color, xScreen, yScreen) {
	Crafty.e("ColorPicker, Color, 2D, DOM, Mouse")
	.attr({x:0, y:0, w:20, h:20})
	.color(color)
	.css({border:"2px black solid"})
	.bind("ViewportScroll", function(e) { this.z = 10; this.attr({x: -Crafty.viewport.x + xScreen, y:-Crafty.viewport.y + yScreen}) } )
	.bind("MouseDown", function(e) { GameInstance.get().getCharHolder().setColor(color); });
};
