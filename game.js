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
        console.log(inp);
    };
    this.owner = owner;
    this.x = x;
    this.y = y;
};

var testTile = new Game.Tile(true, "_", "Black");
var centerTile = new Game.Tile(true, "X", "Green");
var nullTile = new Game.Tile(false, "?", "White");
testPlayer = new Game.Player("#0000ff", "anders", 14, 12);
var testPlayer2 = new Game.Player("Red", "testuser", 4, 6);
var testObject = new Game.GameObject("dummy", "a", "Pink", false, {
    health : 0,
    maxhealth : 0,
    attack : 2
}, function() {
}, 2, 3);
testSnap = {
    groundLayer : [],
    objects : [testPlayer, testObject, testPlayer2]
};

var playerList = [testPlayer, testPlayer2];

for (var i = 0; i < 30; i++) {
    testSnap.groundLayer.push([]);
    for (var x = 0; x < 30; x++) {
        if (i == 15 && x == 15) {
            testSnap.groundLayer[i].push(centerTile);
        } else {
            testSnap.groundLayer[i].push(testTile);
        }

    }
}

Game.move = function(direction, player) {
    for (var i = 0; i < playerList.length; i++) {
        if (playerList[i].owner == player) {
            switch(direction) {
                case "l":
                    if (Game.checktile(playerList[i].x - 1, playerList[i].y, testSnap)) {
                        playerList[i].x--;
                    }
                    break;
                case "u":
                    if (Game.checktile(playerList[i].x, playerList[i].y - 1, testSnap)) {
                        playerList[i].y--;
                    }
                    break;
                case "r":
                    if (Game.checktile(playerList[i].x + 1, playerList[i].y, testSnap)) {
                        playerList[i].x++;
                    }
                    break;
                case "d":
                    if (Game.checktile(playerList[i].x, playerList[i].y + 1, testSnap)) {
                        playerList[i].y++;
                    }
                    break;

            }
        }
    }
    return;
};

Game.checktile = function(x, y, level) {
    if (Game.checkObjects(x, y, level.objects)) {
        if (Game.checkObjects(x, y, level.objects).isWalkable) {
            return true;
        } else {
            return false;
        }
    } else {
        try {
            return level.groundLayer[y][x].isWalkable;
        } catch(err) {
            return false;

        }
    }
};

Game.doesTileExist = function(x, y, layer) {
    try {
        if (layer[y][x]) {
            return true;
        }
    } catch(err) {
        return false;
    }
};

Game.checkObjects = function(x, y, objects) {
    for (var a = 0; a < objects.length; a++) {
        if (objects[a].x == x && objects[a].y == y) {
            return objects[a];
        }
    }
    return false;

};

Game.checkPlayer = function(players, owner) {

    for (var a = 0; a < players.length; a++) {
        if (players[a].owner == owner) {
            return players[a];
        }
    }
    return false;

};

Game.handleKey = function(data) {
    switch (data.key) {
        case  37:
            Game.move("l", data.owner);
            break;
        case 38:
            Game.move("u", data.owner);
            break;
        case 39:
            Game.move("r", data.owner);
            break;
        case 40:
            Game.move("d", data.owner);
            break;
        case 90:
            if (Game.checkPlayer(playerList, data.owner)) {
                Game.checkPlayer(playerList, data.owner).func(data.key);
            }
            break;
        case 88:
            if (Game.checkPlayer(playerList, data.owner)) {
                Game.checkPlayer(playerList, data.owner).func(data.key);
            }
            break;

    }

};

Game.makeSnap = function(player, level) {
    var newSnap = {
        groundLayer : [],
        objects : []
    };
    var oy = 0;
    var ox = 0;
    for (var y = player.y - 6; y < player.y + 5; y++) {
        newSnap.groundLayer.push([]);

        for (var x = player.x - 4; x < player.x + 7; x++) {
            ox++;
            
            if (Game.doesTileExist(x, y, level.groundLayer)) {
                newSnap.groundLayer[oy].push(level.groundLayer[y][x]);
            } else {
                newSnap.groundLayer[oy].push(nullTile);
            }

            if (Game.checkObjects(x, y, level.objects)) {
               var processedObject = JSON.parse(JSON.stringify(Game.checkObjects(x, y, level.objects)));
                processedObject.x = ox;
                processedObject.globalx = x;
                processedObject.globaly = y;
                processedObject.y = oy;
                newSnap.objects.push(processedObject);
            }
        }
        ox = 0;
        oy++;
    }
    return newSnap;
};

