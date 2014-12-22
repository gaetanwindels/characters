/**
 * A world contains the tiles that can be displayed in a screen.
 * This class provides tools for persistency.
 * A world is infinite, only limited by the storage capacity.
 */

var World = function () {
	this._NEGATIVES_INDEX = 0;
	this._POSITIVES_INDEX = 1;
	/** Tile size */
	this._TILE_SIZE = 26;
	/** Default tiles per region */
	this._DEFAULT_REGION_SIZE = 20;
	/** Tiles per region */
	this._regionSize = this._DEFAULT_REGION_SIZE;
	/** Value from the edge where we have to expand the world */
	this._EXPANSION_EDGE = (this._regionSize * this._regionSize) / 8;
	/** The separator used to encode coordinate into an object property */
	this._SEPARATOR = "x";
	/** Holds the regions coordinates in XxY format (ex : 1x2) */
	this._regions = {};
	/** The file path where to store the file */
	this._storingPath = "";
};

/**
 * Creates an empty world.
 * @param path the string representing the 
 */World.prototype.init = function() {
	this.createRegion(0, 0);
	this.createRegion(-1, 0);
	this.createRegion(0, -1);
	this.createRegion(-1, -1);
};

/**
 * Loads a world which has its data stored in a file. If create is set to true
 * this method will create a new file if a file cannot be found at path.
 * @param path the string representing the 
 * @param create creates a new file if set to true, doesn't if set to false
 */
World.prototype.load = function(path, create) {

};

/**
 * Modifies the tile that has x, y as coordinates.
 * This creates a new region if the region doesn't exist where the tile is 
 * supposed to be.
 * @param 
 * @param
 * @tile
 */
World.prototype.replace = function(x, y, tile) {
	var indexX = Math.abs(x % this._regionSize);
	var indexY = Math.abs(y % this._regionSize);
	var regionX;
	var regionY; 
	var region = this._getTileRegion(x, y);
	if(region === undefined) {
		regionX = Math.floor(x / this._regionSize); 
		regionY = Math.floor(y / this._regionSize);
		region = this.createRegion(regionX, regionY);
    }
	region[indexX][indexY] = tile;
};

/**
 * Expands the world, the way forward if forward is set to true.
 * @param forward the direction where to expand the world
 */
World.prototype.createRegion = function(x, y) {
	var array = new Array(this._DEFAULT_REGION_SIZE);
	for (var i = 0; i < array.length; i++) {
		array[i] = new Array(this._DEFAULT_REGION_SIZE);
	}
	this._regions[x + this._SEPARATOR + y] = array;
	return this._regions[x + this._SEPARATOR + y];
};

/**
 * Gets the region 
 * @param regionX
 * @param regionY
 * @returns
 */
World.prototype.getRegion = function(regionX, regionY) {
	return this._regions[regionX + this._SEPARATOR + regionY];
};

/**
 * 
 * @param tileX
 * @param tileY
 * @returns
 */
World.prototype._getTileRegion = function(tileX, tileY) {
	var regionX = Math.floor(tileX / this._regionSize); 
	var regionY = Math.floor(tileY / this._regionSize);
	return this.getRegion(regionX, regionY);
};

/**
 * 
 * @param tileX
 * @param tileY
 * @returns null if the tile doesn't exist, the actual tile otherwise
 */
World.prototype.getTile = function(tileX, tileY) {
	var indexX = Math.abs(tileX % this._regionSize);
	var indexY = Math.abs(tileY % this._regionSize);
	var region = this._getTileRegion(tileX, tileY);
	if (region !== undefined) {
		return this._getTileRegion(tileX, tileY)[indexX][indexY];
	} else {
		return null;
	}
};

/**
 * 
 * @param tileX
 * @param tileY
 * @returns
 */
World.prototype.getTileFromPosition = function(x, y) {
	var tileX = Math.floor(x / this._TILE_SIZE); 
	var tileY = Math.floor(y / this._TILE_SIZE);
	return this.getTileRegion(tileX, tileY);
};

/**
 * If (x, y) is close enough to the edge, creates a new region
 * @param x x-coordinate to check
 * @param y y-coordinate to check
 */
World.prototype.expand = function(x, y) {
	var tileX = Math.floor(x / this._regionSize); 
	var tileY = Math.floor(y / this._regionSize);
	var regionX = Math.floor(tileX / this._regionSize); 
	var regionY = Math.floor(tileY / this._regionSize);
	var regionSize = this._regionSize * this._TILE_SIZE;
	var regionStartX = regionSize * regionX;
	var regionEndX = regionStartX + regionSize;
	var regionStartY = regionSize * regionY;
	var regionEndY = regionStartY + regionSize;
	var indexX = 0; // The index in x to add to the region
	var indexY = 0; // The index in y to add to the region
	var expand = false;

	// Checking if close to the edge
	if (x + this._EXPANSION_EDGE > regionEndX) {
		indexX++;
	} else if (x - this._EXPANSION_EDGE < regionStartX) {
		indexX--;
	}
	
	if (y + this._EXPANSION_EDGE > regionEndY) {
		indexY++;
	} else if (y - this._EXPANSION_EDGE < regionEndY) {
		indexY--;
	}
	
	// Expanding if the region doesn't exist
	if (this.getRegion(regionX + indexX, regionY + indexY) === undefined) {
		this.createRegion(regionX + indexX, regionY + indexY);
		expand = true;
	}
	if (this.getRegion(regionX + indexX, regionY + indexY) === undefined) {
		this.createRegion(regionX + indexX, regionY + indexY);
		expand = true;
	} 
	if (this.getRegion(regionX + indexX, regionY + indexY) === undefined) {
		this.createRegion(regionX + indexX, regionY + indexY);
		expand = true;
	}
	if (expand) { console.log("expand! x = " + regionX + "/ y = " + regionY + " " + this._EXPANSION_EDGE); };
	return expand;
};

/**
 * 
 * @param x
 * @param y
 * @param width
 * @param height
 */
World.prototype.toString = function(x, y, width, height) {
	var string = "";
	
	for (var i = x; i < x + width; i++) {
		for (var j = y; j < y + height; j++) {
			if (this.getTile(i, j) !== undefined) {
			    string += this.getTile(i, j);
			} else {
				string += " ";
			}
		}
		string += "\n";
	}
	return string;
};

World.prototype.getTileSize = function() {
	return this._TILE_SIZE;
};

World.prototype.getSeparator = function() {
	return this._SEPARATOR;
};

World.prototype.getRegions = function() {
	return this._regions;
};

World.prototype.getRegionSize = function() {
	return this._regionSize;
};
