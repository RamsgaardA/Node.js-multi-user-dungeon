Game = {};
Game.Tiles = {};
Game.Objects = {};

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

var stick = new Game.Weapon("Stick", 2, 2, 1, 1);
var loinCloth = new Game.Armor("Loin Cloth", 2, 0, 1, 1, 1);

Game.Stairs = function(symbol, color, leadsto, x, y, level) {
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
        if (Game.findLevel(actor.level, levels)) {
            Game.findLevel(actor.level, levels).objects.push(actor);
        } else {
            console.log("Error, level does not exist");
        }
    };
    this.x = x;
    this.y = y;
    this.level = level;
};

Game.Player = function(color, owner, x, y) {
    this.type = "Player";
    this.symbol = "@";
    this.color = color;
    this.isWalkable = false;
    this.contents = {
        str : 4,
        agi : 4,
        con : 4,
        hp : 100,
        mhp : 100,
        weapon : [stick],
        armor : [loinCloth]
    };
    this.func = function(inp) {

    };
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.level = "testLevel1";
    this.kill = function() {
        delete this;
    };
};
