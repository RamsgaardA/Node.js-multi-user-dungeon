Game.then = Date.now();

Game.update = function() {
    var now = Date.now();
    var delta = now - Game.then;

    if (delta > 1000) {
        Game.moveCreatures();
        Game.then = now;
    }

};

Game.move = function(direction, player) {
    if (Game.checkPlayer(Game.Players, player)) {
        var actualPlayer = Game.checkPlayer(Game.Players, player);
    } else {
        console.log("ERROR, could not find " + player + " in players!");
        return false;
    }
    if (Game.findLevel(actualPlayer.level, Game.Levels)) {
        var level = Game.findLevel(actualPlayer.level, Game.Levels);
    } else {
        console.log("ERROR, could not find level " + actualPlayer.level);
        return false;
    }

    for (var i = 0; i < Game.Players.length; i++) {
        if (Game.Players[i].owner == player) {
            switch(direction) {
                case "l":
                    if (Game.checkObjects(Game.Players[i].x - 1, Game.Players[i].y, level.objects)) {
                        Game.checkObjects(Game.Players[i].x - 1, Game.Players[i].y, level.objects).func(actualPlayer);
                    }
                    if (Game.checktile(Game.Players[i].x - 1, Game.Players[i].y, level)) {
                        Game.Players[i].x--;
                    }
                    break;
                case "u":
                    if (Game.checkObjects(Game.Players[i].x, Game.Players[i].y - 1, level.objects)) {
                        Game.checkObjects(Game.Players[i].x, Game.Players[i].y - 1, level.objects).func(actualPlayer);
                    }
                    if (Game.checktile(Game.Players[i].x, Game.Players[i].y - 1, level)) {
                        Game.Players[i].y--;
                    }
                    break;
                case "r":
                    if (Game.checkObjects(Game.Players[i].x + 1, Game.Players[i].y, level.objects)) {
                        Game.checkObjects(Game.Players[i].x + 1, Game.Players[i].y, level.objects).func(actualPlayer);
                    }
                    if (Game.checktile(Game.Players[i].x + 1, Game.Players[i].y, level)) {
                        Game.Players[i].x++;
                    }
                    break;
                case "d":
                    if (Game.checkObjects(Game.Players[i].x, Game.Players[i].y + 1, level.objects)) {
                        Game.checkObjects(Game.Players[i].x, Game.Players[i].y + 1, level.objects).func(actualPlayer);
                    }
                    if (Game.checktile(Game.Players[i].x, Game.Players[i].y + 1, level)) {
                        Game.Players[i].y++;
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

Game.getAllObjectsOnXY = function(x, y, objects) {
    var foundObjects = [];
    for (var a = 0; a < objects.length; a++) {
        if (objects[a].x == x && objects[a].y == y) {
            foundObjects.push(objects[a]);
        }
    }

    return foundObjects;

};

Game.findObjectIndex = function(object, objects) {
    for (var a = 0; a < objects.length; a++) {
        if (objects[a] == object) {
            return a;
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
            if (Game.checkPlayer(Game.Players, data.owner)) {
                Game.checkPlayer(Game.Players, data.owner).handlekeys(data.key);
            }
            break;
        case 88:
            if (Game.checkPlayer(Game.Players, data.owner)) {
                Game.checkPlayer(Game.Players, data.owner).handlekeys(data.key);
            }
            break;

    }

};

Game.findLevel = function(lookingfor, levels) {
    for (var i = 0; i < levels.length; i++) {
        if (levels[i].name == lookingfor) {
            return levels[i];
        }
    }
    return false;
};

Game.getPlayerIndexSafely = function(name, objectsToSearch) {
    for (var a = 0; a < objectsToSearch.length; a++) {
        try {
            if (objectsToSearch[a].name == name) {
                return a;
            }
        } catch(er) {

        }
    }
    return false;

};

Game.makeSnap = function(player) {
    var newSnap = {
        groundLayer : [],
        objects : []
    };
    if (Game.checkPlayer(Game.Players, player)) {
        var player = Game.checkPlayer(Game.Players, player);
    } else {
        return {
            groundLayer : [[Game.Tiles.nullTile]],
            objects : []
        };
    }
    if (Game.findLevel(player.level, Game.Levels)) {
        var level = Game.findLevel(player.level, Game.Levels);
    } else {
        return {
            groundLayer : [[Game.Tiles.nullTile]],
            objects : []
        };
    }
    var oy = 0;
    var ox = 0;
    for (var y = player.y - 5; y < player.y + 6; y++) {
        newSnap.groundLayer.push([]);

        for (var x = player.x - 5; x < player.x + 6; x++) {

            if (Game.doesTileExist(x, y, level.groundLayer)) {
                newSnap.groundLayer[oy].push(level.groundLayer[y][x]);
            } else {
                newSnap.groundLayer[oy].push(Game.Tiles.nullTile);
            }

            if (Game.checkObjects(x, y, level.objects)) {
                var objectsToProcess = Game.getAllObjectsOnXY(x, y, level.objects);
                for (var abc = 0; abc < objectsToProcess.length; abc++) {
                    var processedObject = JSON.parse(JSON.stringify(objectsToProcess[abc]));
                    processedObject.x = ox;
                    processedObject.y = oy;
                    if (processedObject.type == "Player") {
                        if (processedObject.owner != player.owner) {
                            processedObject.owner = "";
                        }
                    }
                    newSnap.objects.push(processedObject);
                }
            }
            ox++;
        }
        ox = 0;
        oy++;
    }
    return newSnap;
};

Game.clearLevels = function(levels) {
    for (var a = 0; a < levels.length; a++) {
        levels[a].objects = [];
    }
};

Game.distributeObjects = function(objects, levels) {
    Game.clearLevels(levels);
    for (var i = 0; i < objects.length; i++) {
        var lookingFor = objects[i].level;
        for (var a = 0; a < levels.length; a++) {
            if (levels[a].name == lookingFor) {
                levels[a].objects.push(objects[i]);
            }
        }
    }
};

Game.buildMap = function(map) {
    var finishedMap = [];
    for (var i = 0; i < map.length; i++) {
        finishedMap.push([]);
        for (var x = 0; x < map[i].length; x++) {
            if (map[i][x] == 0) {
                finishedMap[i].push(Game.Tiles.groundTile);
            } else if (map[i][x] == 1) {
                finishedMap[i].push(Game.Tiles.wallTile);
            } else if (map[i][x] == 2) {
                finishedMap[i].push(Game.Tiles.centerTile);
            } else if (map[i][x] == 3) {
                finishedMap[i].push(Game.Tiles.indoorTile);
            } else {
                finishedMap[i].push(Game.Tiles.nullTile);
            }

        }
    }
    return finishedMap;
};

Game.spawnPlayer = function(id, startx, starty) {
    var x = startx;
    var y = starty;
    while (!Game.checktile(x, y, Game.Levels[1])) {
        if (x < Game.Levels[1].groundLayer[0].length - 1) {
            x++;
        } else if (y < Game.Levels[1].groundLayer.length - 1) {
            y++;
            x = 0;
        }
    }
    var newPlayer = new Game.Player('#' + ('00' + (Math.random() * 4096 << 0).toString(16)).substr(-3), id, Game.generatePlayerStats(), x, y);
    Game.distributeObjects(Game.Objects, Game.Levels);

};

Game.moveCreatures = function() {
    for (var i = 0; i < Game.Objects.length; i++) {
        if (Game.Objects[i].type == "Creature") {
            if (Game.Objects[i].move) {
                Game.Objects[i].move();
            }
        }
    }
};

Game.fight = function(actor1, actor2) {

};

Game.generatePlayerStats = function() {
    var rand = Math.round(Math.random() * 2);
    if (rand == 0) {
        var weapon = Game.Items.sharpStick;
    } else if (rand == 1) {
        var weapon = Game.Items.woodenClub;
    } else if (rand == 2) {
        var weapon = Game.Items.woodenSword;
    }

    var stats = {
        str : 0,
        agi : 0,
        con : 0,
        hp : 100,
        mhp : 100,
        weapon : [weapon],
        armor : [Game.Items.loinCloth]
    };

    var points = 10;

    while (points > 0) {
        var distribute = Math.round(Math.random() * 1);
        if (points - distribute > -1) {
            stats.str += distribute;
            points -= distribute;
        }
        distribute = Math.round(Math.random() * 1);
        if (points - distribute > -1) {
            stats.agi += distribute;
            points -= distribute;
        }
        distribute = Math.round(Math.random() * 1);
        if (points - distribute > -1) {
            stats.con += distribute;
            points -= distribute;
        }
    }

    return stats;
};

Game.stripJSON = function(JSONtoStrip) {
    var split = JSONtoStrip.split("");
    var output = "";
    for (var i = 0; i < split.length; i++) {
        if (split[i] == '"') {
            output+= " ";
        } else {
            output += split[i];
        }
    }
    return output;
};
