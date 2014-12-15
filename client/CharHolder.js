/**
 * The holder for the character selection
 */
var CharHolder = function() {
	this._design = {};
	this._design[TileType.COLLIDE] = "[ ]";
	this._design[TileType.DECORATION] = "{ }";
	this._modes = [ TileType.COLLIDE, TileType.DECORATION ];
	this._char = " ";
	this._color = "green";
	/** the crafty entity created */
	this._entity = null;
	/** */
	this._active = false;
	this._type = TileType.DECORATION;
};

CharHolder.prototype.init = function() {
	this._entity = Crafty.e("CharHolder, 2D, DOM, Text, Keyboard")
	.attr({ x: 0, y: 0, w: 50, h: 50 })
	.text("[ ]")
	.textFont({ size: '50px', family: 'Courier' })
	.textColor(this._color)
	.bind("ViewportScroll", function() {
		this.attr({ x: -Crafty.viewport.x + (Crafty.viewport.width / 2) - this._w / 2, y: -Crafty.viewport.y + Crafty.viewport.height - this._h / 2, w: 100, h: 100 });
	});
};

CharHolder.prototype.toggle = function() {
	this._active = !this._active;
	var style = this._active ? "bold" : "";
	this._entity.textFont({type : style });
};

CharHolder.prototype.getChar = function() {
	return this._char;
};

CharHolder.prototype.getType = function() {
	return this._type;
};

CharHolder.prototype.getColor = function() {
	return this._color;
};


CharHolder.prototype.setChar = function(e) {
	if (!this._active) {
		return;
	}

	var c = AuthorizedKeys[e.keyCode] !== undefined ? AuthorizedKeys[e.keyCode] : " ";
	this._entity.text("{" + c + "}");
	if (c === this.getChar()) { // same char, changing mode
		if (this.getType() == TileType.DECORATION) {
			this._type = TileType.COLLIDE;
			this._entity.text("{" + c + "}");
		} else {
			this._type = TileType.DECORATION;
			this._entity.text("[" + c + "]");
		}
	}
	this._char = c;
};
