Game = {};
Game.Tiles = {};
Game.Items = {};
Game.Objects = [];
Game.Levels = [];
Game.Players = [];
Game.Maps = [];

Game.Level = function(name, map) {
	this.name = name;
	this.groundLayer = Game.buildMap(map);
	this.objects = [];
	Game.Levels.push(this);
};

Game.Tile = function(isWalkable, symbol, color) {
	this.isWalkable = isWalkable;
	this.symbol = symbol;
	this.color = color;
};

Game.GameObject = function(type, symbol, color, isWalkable, contents, func, x, y, level) {
	this.type = type;
	this.symbol = symbol;
	this.color = color;
	this.isWalkable = isWalkable;
	this.contents = contents;
	this.func = func;
	this.x = x;
	this.y = y;
	this.level = level;
	Game.Objects.push(this);
};

Game.Weapon = function(name, weight, piercing, slashing, bludgeoning) {
	this.type = "Weapon";
	this.name = name;
	this.piercing = piercing;
	this.slashing = slashing;
	this.bludgeoning = bludgeoning;
	this.weight = weight;

};

Game.Armor = function(name, weight, layer, piercing, slashing, bludgeoning) {
	this.type = "Armor";
	this.name = name;
	this.piercing = piercing;
	this.slashing = slashing;
	this.bludgeoning = bludgeoning;
	this.weight = weight;
	this.layer = layer;

};

Game.Stairs = function(symbol, color, leadsto, x, y, level) {
	this.type = "Stairs";
	this.symbol = symbol;
	this.color = color;
	this.isWalkable = true;
	this.contents = {};
	this.func = function(actor) {
		actor.level = leadsto;
		Game.distributeObjects(Game.Objects, Game.Levels);
	};
	this.x = x;
	this.y = y;
	this.level = level;
	Game.Objects.push(this);
};

Game.Player = function(color, owner, contents, x, y) {
	this.type = "Player";
	this.symbol = "@";
	this.color = color;
	this.isWalkable = false;
	this.contents = contents;
	this.func = function(actor){
	    actor.appendMessage("Another player.");
	};
	this.handlekeys = function(inp) {
		this.appendMessage(Game.stripJSON(JSON.stringify(this.contents)));
	};
	this.owner = owner;
	this.x = x;
	this.y = y;
	this.level = "testLevel1";
	this.messages = [""];
	this.appendMessage = function(msg) {
		if (this.messages.length < 5) {
			this.messages.push(msg);
		} else {
			this.messages.shift();
			this.messages.push(msg);
		}
	};
	Game.Objects.push(this);
	Game.Players.push(this);
};
