/**
 * The holder for the character selection
 */
var CharHolder = function() {
	this._design = {};
	this._design[TileType.COLLIDE] = "[ ]";
	this._design[TileType.DECORATION] = "{ }";
	this._modes = [ TileType.COLLIDE, TileType.DECORATION ];
	this._char = " ";
	this._color = "black";
	/** the crafty entity created */
	this._entity = null;
	/** */
	this._active = false;
	this._type = TileType.DECORATION;
	this._shifted = false;
};

CharHolder.prototype.init = function() {
	this._entity = Crafty.e("CharHolder, 2D, Canvas, Text, Keyboard")
	.attr({ x: 0, y: 0, w: 100, h:60 })
	.text("[ ]")
	.textColor(GameInstance.get().getCharHolder().getColor())
	.textFont({ size: '50px', family: 'Courier' })
	.bind("ViewportScroll", function() {
		this.attr({ x: -Crafty.viewport.x + (Crafty.viewport.width / 2) - this._w / 2, y: -Crafty.viewport.y + Crafty.viewport.height - this._h });
	});
	this._entity.z = 10;
	$("#chat").css("width", Crafty.viewport.width / 2.5 + "px");
};

CharHolder.prototype.toggle = function() {
	this._active = !this._active;
	var style = this._active ? "bold" : "";
	this._entity.textFont({type : style });
	$("#game").css("border", this._active ? "2px red solid" : "2px black solid");
};

CharHolder.prototype.setColor = function(color) {
	this._color = color;
	this._entity.textColor(color);

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
	if (this._shifted) {
		c = c.toUpperCase();
	}
	this._entity.text("[" + c + "]");
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
