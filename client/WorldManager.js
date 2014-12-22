/**
 * This classes is used to manage rendering with crafty
 */

/**
 * Constructor
 * @param world the world to manage 
 */
var WorldManager = function(world) {
	this._w = world;
	/* Contains the previously rendered entities */
	this._entities = {};
	
	// anchors
	Crafty.e("Anchor, 2D, DOM").attr({ x: 0, y: 0, w: 0, h: 0 }).
	    bind("EnterFrame", function() { this.attr( {x:GameInstance.get().getPlayer().x + 2000,y:GameInstance.get().getPlayer().y + 2000} )});
	Crafty.e("Anchor, 2D, DOM").attr({ x: 0, y: 0, w: 0, h: 0 }).
    bind("EnterFrame", function() { this.attr( {x:GameInstance.get().getPlayer().x - 2000,y:GameInstance.get().getPlayer().y + 4000} )});
	Crafty.e("Anchor, 2D, DOM").attr({ x: 0, y: 0, w: 0, h: 0 }).
    bind("EnterFrame", function() { this.attr( {x:GameInstance.get().getPlayer().x + 2000,y:GameInstance.get().getPlayer().y - 4000} )});
	Crafty.e("Anchor, 2D, DOM").attr({ x: 0, y: 0, w: 0, h: 0 }).
    bind("EnterFrame", function() { this.attr( {x:GameInstance.get().getPlayer().x - 2000,y:GameInstance.get().getPlayer().y - 4000} )});
};

WorldManager.prototype.init = function(world) {	

};

/**
 * Generates the entities displayable on screen
 */
WorldManager.prototype.drawScreen = function() {
	// getting boundaries
    var xStart = Math.floor(-Crafty.viewport.x / this._w.getTileSize());
    var yStart = Math.floor(-Crafty.viewport.y / this._w.getTileSize());
    var xEnd = 1 + xStart + Math.ceil(Crafty.viewport.width / this._w.getTileSize());
    var yEnd = 1 + yStart + Math.ceil(Crafty.viewport.height / this._w.getTileSize());
    var coordinates;
    var tile;
    var tileSize = this._w.getTileSize();
    var type;
    var text;
    
	// clearing out of bounds entities
    this._clearEntities(xStart, yStart, Crafty.viewport.width, Crafty.viewport.height);

	// iterates tiles
    for (var x = xStart; x < xEnd; x++) {
    	for (var y = yStart; y < yEnd; y++) {
    		coordinates = x + "x" + y;
    		tile = this._w.getTile(x, y);
    		if (tile != null && tile !== undefined) {
    		    text = tile.char;
    		} else {
    			text == "";
    		}
    		// creates the entity if not in the cache
    		if (tile !== undefined && tile != null && text != "" && text != " " && (this._entities[coordinates] === undefined)) {
    			type = tile.type == TileType.COLLIDE ? "Tile, Floor" : "Decor";
    			this._entities[coordinates] = Crafty.e(type + ", 2D, Canvas, Text")
    			.attr({ x: x * tileSize, y: y * tileSize, w: tileSize, h: tileSize })
    			.text(text)
    			.textColor(tile.color)
    			.textFont({ lineHeight: Math.floor(tileSize * 1.2) + 'px', size: Math.floor(tileSize * 1.2) + 'px', family: 'Courier' });

    			if (tile.type == TileType.COLLIDE) {
    				this._entities[coordinates].textFont( {type:"bold"} );
    			}
    		} 	
    	}
    }
};

WorldManager.prototype.replace = function(x, y, tile) {
	if (this._entities[x + "x" + y] !== undefined) {
	    this._entities[x + "x" + y].destroy(); // updating cache
	    delete this._entities[x + "x" + y];
    }
	this._w.replace(x, y, tile);
};

/**
 * Remove the entities that can't be displayed within the parameters bounds
 */
WorldManager.prototype._clearEntities = function(x, y, width, height) {
	var xTile;
	var yTile;
	var tileSize = this._w.getTileSize();
	// getting boundaries
	for (var entity in this._entities) {
		if (this._entities.hasOwnProperty(entity)) {
			// extracting x, y region values
			xTile = entity.split(this._w.getSeparator())[0];
			yTile = entity.split(this._w.getSeparator())[1];
			
			if (xTile < x || xTile > x + width || yTile < y || yTile > y + height) {
				this._entities[entity].destroy();
				delete this._entities[entity];
			} else {
			}
		}
	}
};