Game = {};
Game.Tiles = {};
Game.Objects = {};

Game.Tile = function(isWalkable, symbol, color) {
this.isWalkable = isWalkable;
this.symbol = symbol;
this.color = color;
};

Game.GameObject = function(type, symbol, color, isWalkable, contents, func, x, y) {
this.type = type;
this.symbol = symbol;
this.color = color;
this.isWalkable = isWalkable;
this.contents = contents;
this.func = func;
this.x = x;
this.y = y;
};

Game.Stairs = function( symbol, color, leadsto, x, y) {
this.type = "Stairs";
this.symbol = symbol;
this.color = color;
this.isWalkable = true;
this.contents = {};
this.func = function(actor) {
if (Game.getPlayerIndexSafely(actor.name, Game.findLevel(actor.level, levels))) {
Game.findLevel(actor.level, levels).objects.splice(Game.getPlayerIndexSafely(actor.name, Game.findLevel(actor.level, levels)), 0);

}

actor.level = leadsto;
Game.findLevel(actor.level, levels).objects.push(actor);
};
this.x = x;
this.y = y;
};

Game.Player = function(color, owner, x, y) {
this.type = "Player";
this.symbol = "@";
this.color = color;
this.isWalkable = false;
this.contents = {
health : 100,
maxhealth : 100,
attack : 4,
};
this.func = function(inp) {

};
this.owner = owner;
this.x = x;
this.y = y;
this.level = "testLevel1";
};