/**
 * Overriding Crafty.key to access names and provides a set of 
 * authorized characters
 */
var KeyFinder = {};

KeyFinder.find = function(keycode, shift, alt) {
	return AuthorizedKeys["" + keycode];
}

var AuthorizedKeys = {
		"46" : " ",		
		"48" : "�",
		"49" : "&",
		"50" : "�",
		"51" : "\"",
		"52":"'",
		"53":"(",
		"54":"-",
		"55":"�",
		"56":"_",
		"57":"�",
		"65":"a",
		"66":"b",
		"67":"c",
		"68":"d",
		"69":"e",
		"70":"f",
		"71":"g",
		"72":"h",
		"73":"i",
		"74":"j",
		"75":"k",
		"76":"l",
		"77":"m",
		"78":"n",
		"79":"o",
		"80":"p",
		"81":"q",
		"82":"r",
		"83":"s",
		"84":"t",
		"85":"u",
		"86":"v",
		"87":"w",
		"88":"x",
		"89":"y",
		"90":"z",
		"96":"0",
		"97":"1",
		"98":"2",
		"99":"3",
		"100":"4",
		"101":"5",
		"102":"6",
		"103":"7",
		"104":"8",
		"105":"9",
		"106":"*",
		"107":"+",
		"109":"|",
		"110":".",
		"111":"/",
		"186":";",
		"187":"=",
		"188":",",
		"189":"_",
		"190":".",
		"191":"/",
		"192":"&egrave;",
		"219":")",
		"220":"\\",
		"221":"}",
		"222":"'",
		"223":"!",
}; 
