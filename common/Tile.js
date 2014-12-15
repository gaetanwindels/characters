/**
 * New node file
 */

var TileType = {
		COLLIDE : 0,
		DECORATION : 1,
		REMOVEABLE : 2
};

var Tile = function(char, type, color) {
	this.char = char;
	this.type = type;
	this.color = color;
	if (type === undefined) {
		type = TileType.COLLIDE;
	}
	if (color === undefined) {
		this.color = "Black";
	}
};
