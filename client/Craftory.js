/**
 * A factory meant to produce crafty entities
 */

var Craftory = {};

Craftory.createPlayerEntity = function() {
	var player = Crafty.e("Player, 2D, DOM, Text, Multiway, Collision, Gravity")
	.gravity("Floor")
	.attr({ x: 0, y: -50, w: 100, h: 60 })
	.multiway(6, { S:90, Z:-90, D:0, Q:-180})
	.text("(°_°) <br>(___)<br>&nbsp;#&nbsp;#").unselectable()
	.textFont({ size: '20px', family: 'courier' })
	.onHit('Tile',function(ent){
		console.log(this);
		if (this._speed.y > 0) {
			//this.y = ent[0].obj.y + ent[0].obj._h;
		}	
		if (this._speed.x < 0) {
			//this.x = ent[0].obj.x + ent[0].obj._w;
		}
		if (this._speed.x > 0) {
			//this.x = ent[0].obj.x - this._w;
		}
	});
	return player;
}

Craftory.createTileEntity = function() {
	
}
