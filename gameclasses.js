Game = {};
Game.Tiles = {};
Game.Items = {};
Game.CreatureTemplates = {};
Game.Objects = [];
Game.Levels = [];
Game.Players = [];
Game.Maps = [];
Game.Creatures = [];

Game.objectID = function(){
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        var ascicode = Math.floor((Math.random() * 42) + 48);
        if (ascicode < 58 || ascicode > 64) {
            idstr += String.fromCharCode(ascicode);
        }
    } while (idstr.length<32);
    return (idstr);
};



Game.Level = function(name, map, difficulty) {
    this.name = name;
    this.difficulty = difficulty;
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
    this.id = Game.objectID();
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

Game.Weapon = function(name, weight, atk) {
    this.type = "Weapon";
    this.name = name;
    this.atk = atk;
    this.weight = weight;

};

Game.Armor = function(name, weight, layer, def) {
    this.type = "Armor";
    this.name = name;
    this.def = def;
    this.layer = layer;

};

Game.Stairs = function(symbol, color, leadsto, x, y, level) {
    this.id = Game.objectID();
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

Game.HostileCreature = function(symbol, name, color, stats, x, y, level) {
    this.id = Game.objectID();
    this.type = "Creature";
    this.name = name;
    this.symbol = symbol;
    this.color = color;
    this.isWalkable = false;
    this.contents = stats;
    this.func = function(actor) {
        Game.fight(actor, this);
    };
    this.x = x;
    this.y = y;
    this.level = level;
    this.move = function() {
        var fx = Math.round(Math.random());
        var bx = Math.round(Math.random());
        var fy = Math.round(Math.random());
        var by = Math.round(Math.random());

        if (Math.round(Math.random()) == 1) {
            if (Game.checktile(this.x + fx - bx, this.y, Game.findLevel(this.level, Game.Levels))) {
                this.x += fx;
                this.x -= bx;
            }
        } else {
            if (Game.checktile(this.x, this.y + fy - by, Game.findLevel(this.level, Game.Levels))) {
                this.y += fy;
                this.y -= by;
            }
        }
    };
    Game.Objects.push(this);
    Game.Creatures.push(this);
};

Game.Player = function(color, owner, contents, x, y, level) {
    this.id = Game.objectID();
    this.type = "Player";
    this.symbol = "@";
    this.color = color;
    this.isWalkable = false;
    this.contents = contents;
    this.func = function(actor) {
        actor.appendMessage("Another player.");
    };
    this.handlekeys = function(inp) {
        this.appendMessage(Game.stripJSON(JSON.stringify(this.contents)));
    };
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.level = level;
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
