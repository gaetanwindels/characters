/**
 * This class defines and provides tools to handle the storing of clients.
 * Clients are identify and accessed by their socket id.
 */

/**
 * Creates a new client list
 * @param maxCapacity the max capacity of the list, if empty 
 * it will take a default value defined by _DEFAULT_MAX_CAPACITY
 */
var ClientList = function(maxCapacity) {
    this._DEFAUT_MAX_CAPACITY = 100;
    this._capacity = this._DEFAUT_MAX_CAPACITY;
    this._clients = {};
    this._count = 0; 
    if (maxCapacity !== undefined) { this._capacity = maxCapacity; }
};

/**
 * Converts a client list into a string. The format is
 * ["socketId"] = client 
 */
ClientList.prototype.toString = function() {
	var result = "";
	for(var client in this._clients) {
		if (this._clients.hasOwnProperty(client)) {
			result += "[\"" + client + "\"] = " + this._clients[client] + "\n";
	    }
	}
	return result;
};

/**
 * Adds a new client to the list if the list capacity isn't full or the id 
 * isn't already in the list.
 * @param socketId the socket id of the client
 * @param client the actual client
 */
ClientList.prototype.add = function(socketId, client) {
	if (this._clients[socketId] === undefined && this._count < this._capacity) {
		this._count++;
		this._clients[socketId] = client;
    }
};

/**
 * Returns a client associated by his socket id
 * @param socketId
 * @returns the client associated to his socket id
 */
ClientList.prototype.get = function(socketId) {
	return this._clients[socketId];
};

/**
 * Removes a client associated by his socket id
 * @param socketId
 */
ClientList.prototype.remove = function(socketId) {
	if (this._clients[socketId] !== undefined) {
	    this._count--;
	    delete this._clients[socketId];
    }
};

/**
 * Removes a client associated by his socket id
 * @return 
 */
ClientList.prototype.getCount = function() {
	return this._count;
};
