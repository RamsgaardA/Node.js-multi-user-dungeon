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

Game.move = function(direction, player) {
	if (Game.checkPlayer(playerList, player)) {
		var actualPlayer = Game.checkPlayer(playerList, player);
	} else {
		console.log("ERROR, could not find " + player + " in players!");
		return false;
	}
	if (Game.findLevel(actualPlayer.level, levels)) {
		var level = Game.findLevel(actualPlayer.level, levels);
	} else {
		console.log("ERROR, could not find level " + actualPlayer.level);
		return false;
	}

	for (var i = 0; i < playerList.length; i++) {
		if (playerList[i].owner == player) {
			switch(direction) {
				case "l":
					if (Game.checkObjects(playerList[i].x - 1, playerList[i].y, level.objects)) {
						Game.checkObjects(playerList[i].x - 1, playerList[i].y, level.objects).func(actualPlayer);
					}
					if (Game.checktile(playerList[i].x - 1, playerList[i].y, level)) {
						playerList[i].x--;
					}
					break;
				case "u":
					if (Game.checkObjects(playerList[i].x, playerList[i].y - 1, level.objects)) {
						Game.checkObjects(playerList[i].x, playerList[i].y - 1, level.objects).func(actualPlayer);
					}
					if (Game.checktile(playerList[i].x, playerList[i].y - 1, level)) {
						playerList[i].y--;
					}
					break;
				case "r":
					if (Game.checkObjects(playerList[i].x + 1, playerList[i].y, level.objects)) {
						Game.checkObjects(playerList[i].x + 1, playerList[i].y, level.objects).func(actualPlayer);
					}
					if (Game.checktile(playerList[i].x + 1, playerList[i].y, level)) {
						playerList[i].x++;
					}
					break;
				case "d":
					if (Game.checkObjects(playerList[i].x, playerList[i].y + 1, level.objects)) {
						Game.checkObjects(playerList[i].x, playerList[i].y + 1, level.objects).func(actualPlayer);
					}
					if (Game.checktile(playerList[i].x, playerList[i].y + 1, level)) {
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
	if (Game.checkPlayer(playerList, player)) {
		var player = Game.checkPlayer(playerList, player);
	} else {
		return {
			groundLayer : [[Game.Tiles.nullTile]],
			objects : []
		};
	}
	if (Game.findLevel(player.level, levels)) {
		var level = Game.findLevel(player.level, levels);
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
				var processedObject = JSON.parse(JSON.stringify(Game.checkObjects(x, y, level.objects)));
				processedObject.x = ox;
				processedObject.y = oy;
				if (processedObject.type == "Player") {
					processedObject.owner = "";
				}
				newSnap.objects.push(processedObject);
			}
			ox++;
		}
		ox = 0;
		oy++;
	}
	return newSnap;
};
