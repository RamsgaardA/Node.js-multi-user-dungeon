Game.then = Date.now();

Game.update = function() {
	var now = Date.now();
	var delta = now - Game.then;

	if (delta > 1000) {
		Game.moveCreatures();
		Game.then = now;
	}

};

Game.moveRandomly = function() {
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
					if (Game.checkObjects(actualPlayer.x - 1, actualPlayer.y, level.objects)) {
						Game.checkObjects(actualPlayer.x - 1, actualPlayer.y, level.objects).func(actualPlayer);
					}
					if (Game.checktile(actualPlayer.x - 1, actualPlayer.y, level)) {
						actualPlayer.x--;
					}
					break;
				case "u":
					if (Game.checkObjects(actualPlayer.x, actualPlayer.y - 1, level.objects)) {
						Game.checkObjects(actualPlayer.x, actualPlayer.y - 1, level.objects).func(actualPlayer);
					}
					if (Game.checktile(actualPlayer.x, actualPlayer.y - 1, level)) {
						actualPlayer.y--;
					}
					break;
				case "r":
					if (Game.checkObjects(actualPlayer.x + 1, actualPlayer.y, level.objects)) {
						Game.checkObjects(actualPlayer.x + 1, actualPlayer.y, level.objects).func(actualPlayer);
					}
					if (Game.checktile(actualPlayer.x + 1, actualPlayer.y, level)) {
						actualPlayer.x++;
					}
					break;
				case "d":
					if (Game.checkObjects(actualPlayer.x, actualPlayer.y + 1, level.objects)) {
						Game.checkObjects(actualPlayer.x, actualPlayer.y + 1, level.objects).func(actualPlayer);
					}
					if (Game.checktile(actualPlayer.x, actualPlayer.y + 1, level)) {
						actualPlayer.y++;
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

Game.findObjectIndex = function(objectID, objects) {
	for (var a = 0; a < objects.length; a++) {
		if (objects[a].id == objectID) {
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
			if (objectsToSearch[a].owner == name) {
				return a;
			}
		} catch(er) {

		}
	}
	return false;

};

Game.erase = function(object) {
	var lvl = Game.findLevel(object.level, Game.Levels);
	lvl.objects.splice(Game.findObjectIndex(object.id, lvl.objects), 1);
	Game.Objects.splice(Game.findObjectIndex(object.id, Game.Objects), 1);
	if (object.type == "Player") {
		Game.Players.splice(Game.getPlayerIndexSafely(object.owner, Game.Players), 1);
	}
	if (object.type == "Creature") {
		Game.Creatures.splice(Game.findObjectIndex(object.id, Game.Objects), 1);
	}

};

Game.isPlayerNear = function(player) {
	if (Game.findLevel(player.level, Game.Levels)) {
		var level = Game.findLevel(player.level, Game.Levels);
	} else {
		console.log("ERROR, could not find level " + player.level);
		return false;
	}
	for (var iy = player.y - 5; iy < player.y + 6; iy++) {
		for (var ix = player.x - 5; ix < player.x + 6; ix++) {
			if (Game.doesTileExist(ix, iy, level.groundLayer)) {
				if (Game.checkObjects(ix, iy, level.objects)) {
					var objects = Game.getAllObjectsOnXY(ix, iy, level.objects);
					for (var i = 0; i < objects.length; i++) {
						if (objects[i].type == "Player") {
							if (objects[i].owner != player.owner) {
								return objects[i];
							}
						}
					}
				}
			}
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

					if (processedObject.type == "Player") {
						if (processedObject.owner != player.owner) {
							processedObject.owner = "";

						} else {
							processedObject.trueX = processedObject.x;
							processedObject.trueY = processedObject.y;
						}

					}

					processedObject.x = ox;
					processedObject.y = oy;
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

Game.listPlayers = function(list) {
	var out = "";
	for (var i = 0; i < list.length; i++) {
		out += list[i].owner + ", ";
	}
	return out;
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
				finishedMap[i].push(Game.Tiles.innerWallTile);
			} else if (map[i][x] == 3) {
				finishedMap[i].push(Game.Tiles.indoorTile);
			} else {
				finishedMap[i].push(Game.Tiles.nullTile);
			}

		}
	}
	return finishedMap;
};

Game.spawnPlayer = function(id) {
	xy = Game.getRandomClearXY(Game.Levels[0]);
	new Game.Player('#' + ('00' + (Math.random() * 4096 << 0).toString(16)).substr(-3), id, Game.generatePlayerStats(), xy.x, xy.y, "Level0");
	Game.distributeObjects(Game.Objects, Game.Levels);

};

Game.moveCreatures = function() {
	for (var i = 0; i < Game.Creatures.length; i++) {
		if (Game.Creatures[i].move) {
			Game.Creatures[i].move();
		}
	}
};

Game.sumDefense = function(player) {
	var sum = 0;
	for (var i = 0; i < player.contents.armor.length; i++) {
		sum += player.contents.armor[i].def;
	}
	return sum;
};

Game.fight = function(player, creature) {
	var playerDamage = Math.round(Math.random() * 10 * ((player.contents.str * player.contents.weapon[0].atk) / creature.contents.def));
	if (Math.round(Math.random() + (0.01 * player.contents.agi)) == 1) {
		creature.contents.hp -= playerDamage;
		player.appendMessage("You hit the " + creature.name + " for " + playerDamage + " damage.");
	} else {
		player.appendMessage("You miss the " + creature.name + ".");
	}

	if (creature.contents.hp < 0) {

		player.contents.exp += creature.contents.exp;
		player.appendMessage("You slay the " + creature.name + ".");
		Game.erase(creature);
		Game.levelPlayer(player);
		return;
	}
	var creatureDamage = Math.round(Math.random() * 10 * (creature.contents.atk / Game.sumDefense(player)));
	if (Math.round(Math.random() + (0.01 * creature.contents.agi)) == 1) {
		player.contents.hp -= creatureDamage;
		player.appendMessage("The " + creature.name + " hits you for " + creatureDamage + " damage.");
	} else {
		player.appendMessage("The " + creature.name + " misses you.");
	}
	if (player.contents.hp < 0) {
		console.log(player.owner + " has tragically fallen to the " + creature.name);
		Game.erase(player);
		return;
	}

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
		level : 1,
		exp : 0,
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
	var hp = stats.mhp;
	for (var i = 0; i < stats.con; i++) {
		hp = Math.round(hp * 1.1);
	}
	stats.hp = hp;
	stats.mhp = hp;
	return stats;
};

Game.stripJSON = function(JSONtoStrip) {
	var split = JSONtoStrip.split("");
	var output = "";
	for (var i = 0; i < split.length; i++) {
		if (split[i] == '"') {
			output += " ";
		} else {
			output += split[i];
		}
	}
	return output;
};

Game.levelPlayer = function(player) {
	var initialLevel = player.contents.level;
	while (player.contents.exp > player.contents.level * player.contents.level) {
		player.contents.level += 1;
		var points = 2;
		while (points > 0) {
			var distribute = Math.round(Math.random() * 1);
			if (points - distribute > -1) {
				player.contents.str += distribute;
				points -= distribute;
			}
			distribute = Math.round(Math.random() * 1);
			if (points - distribute > -1) {
				player.contents.agi += distribute;
				points -= distribute;
			}
			distribute = Math.round(Math.random() * 1);
			if (points - distribute > -1) {
				player.contents.con += distribute;
				points -= distribute;
			}
		}
		var hp = 100;
		for (var i = 0; i < player.contents.con; i++) {
			hp = Math.round(hp * 1.1);
		}
		player.contents.hp = player.contents.hp + (hp - player.contents.mhp);
		player.contents.mhp = hp;
	}
	if (player.contents.level > initialLevel) {
		player.appendMessage("You have risen from level " + initialLevel + " to level " + player.contents.level + ". Press 'z' to see your stats");
		console.log(player.owner + " has risen from level " + initialLevel + " to level " + player.contents.level + ".");
	}
};

Game.getRandomClearXY = function(level) {
	for (var i = 0; i < 1; i++) {
		var max = level.groundLayer[0].length;
		var x = Helpers.GetRandom(1, max);
		var y = Helpers.GetRandom(1, max);
		if (Game.checktile(x, y, level)) {
			return {
				x : x,
				y : y
			};
		} else {
			i--;
		}
	}
};
