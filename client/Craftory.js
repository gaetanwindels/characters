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
			if (this._direction.y < 0 && obj.intersect(this.x - this._direction.x, this.y, this._w, this._h)) {
				this.y += Math.abs((obj.y + obj._h) - this.y);
			}
			if (this._direction.x > 0 && obj.intersect(this.x, this.y - this._direction.y, this._w, this._h)) {
				this.y -= obj._h;
				if (this.hit("Tile")) {
					this.y += obj._h;
					this.x -= Math.abs(obj.x - (this.x + this._w));
				}
			}
			if (this._direction.x < 0 && obj.intersect(this.x, this.y - this._direction.y, this._w, this._h)) {
				this.y -= obj._h;
				if (this.hit("Tile")) {
					this.y += obj._h;
					this.x += Math.abs((obj.x + obj._w) - this.x);
				}
			}
		}
	}).bind("NewDirection", function(dir) { this._direction = dir; });
	return player;
}

Craftory.createTileEntity = function() {
	
}
