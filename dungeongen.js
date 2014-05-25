Helpers = {
    GetRandom : function(low, high) {
        return Math.round((Math.random() * (high - low)) + low);
    }
};

//Game.makeDungeon is based on code from http://bigbadwofl.me/random-dungeon-generator/

Game.makeDungeon = function(size) {
    this.map = null;
    this.map_size = size;
    this.rooms = [];
    this.floorTileCount = 0;
    this.Generate = function() {
        this.map = [];
        this.rooms = [];
        for (var x = 0; x < this.map_size; x++) {
            this.map[x] = [];
            for (var y = 0; y < this.map_size; y++) {
                this.map[x][y] = 0;
            }
        }

        var room_count = Helpers.GetRandom(10, 20);
        var min_size = 5;
        var max_size = 15;

        for (var i = 0; i < room_count; i++) {
            var room = {};

            room.x = Helpers.GetRandom(1, this.map_size - max_size - 1);
            room.y = Helpers.GetRandom(1, this.map_size - max_size - 1);
            room.w = Helpers.GetRandom(min_size, max_size);
            room.h = Helpers.GetRandom(min_size, max_size);

            if (this.DoesCollide(room)) {
                i--;
                continue;
            }
            room.w--;
            room.h--;

            this.rooms.push(room);
        }

        for ( i = 0; i < room_count; i++) {
            var roomA = this.rooms[i];
            var roomB = this.FindClosestRoom(roomA);

            pointA = {
                x : Helpers.GetRandom(roomA.x, roomA.x + roomA.w),
                y : Helpers.GetRandom(roomA.y, roomA.y + roomA.h)
            };
            pointB = {
                x : Helpers.GetRandom(roomB.x, roomB.x + roomB.w),
                y : Helpers.GetRandom(roomB.y, roomB.y + roomB.h)
            };

            while ((pointB.x != pointA.x) || (pointB.y != pointA.y)) {
                if (pointB.x != pointA.x) {
                    if (pointB.x > pointA.x)
                        pointB.x--;
                    else
                        pointB.x++;
                } else if (pointB.y != pointA.y) {
                    if (pointB.y > pointA.y)
                        pointB.y--;
                    else
                        pointB.y++;
                }

                this.map[pointB.x][pointB.y] = 1;
            }
        }

        for ( i = 0; i < room_count; i++) {
            var room = this.rooms[i];
            for (var x = room.x; x < room.x + room.w; x++) {
                for (var y = room.y; y < room.y + room.h; y++) {
                    this.map[x][y] = 1;
                }
            }
        }

        for (var x = 0; x < this.map_size; x++) {
            for (var y = 0; y < this.map_size; y++) {
                if (this.map[x][y] == 1) {
                    for (var xx = x - 1; xx <= x + 1; xx++) {
                        for (var yy = y - 1; yy <= y + 1; yy++) {
                            if (this.map[xx][yy] == 0)
                                this.map[xx][yy] = 2;
                        }
                    }
                }
            }
        }
        this.isConnected();
        if (this.countTiles() != 0) {
            this.Generate();
        }

    };
    this.FindClosestRoom = function(room) {
        var mid = {
            x : room.x + (room.w / 2),
            y : room.y + (room.h / 2)
        };
        var closest = null;
        var closest_distance = 1000;
        for (var i = 0; i < this.rooms.length; i++) {
            var check = this.rooms[i];
            if (check == room)
                continue;
            var check_mid = {
                x : check.x + (check.w / 2),
                y : check.y + (check.h / 2)
            };
            var distance = Math.min(Math.abs(mid.x - check_mid.x) - (room.w / 2) - (check.w / 2), Math.abs(mid.y - check_mid.y) - (room.h / 2) - (check.h / 2));
            if (distance < closest_distance) {
                closest_distance = distance;
                closest = check;
            }
        }
        return closest;
    };
    this.DoesCollide = function(room, ignore) {
        for (var i = 0; i < this.rooms.length; i++) {
            if (i == ignore)
                continue;
            var check = this.rooms[i];
            if (!((room.x + room.w < check.x) || (room.x > check.x + check.w) || (room.y + room.h < check.y) || (room.y > check.y + check.h)))
                return true;
        }

        return false;
    };
    this.Convert = function(map) {
        var newmap = [];
        for (var y = 0; y < map.length; y++) {
            newmap.push([]);
            for (var x = 0; x < map[y].length; x++) {
                if (map[y][x] == 1) {
                    newmap[y].push(0);
                } else if (map[y][x] == 0) {
                    newmap[y].push(1);
                } else if (map[y][x] == 5) {
                    newmap[y].push(0);
                } else {
                    newmap[y].push(map[y][x]);
                }

            }
        }
        return newmap;
    };
    this.countTiles = function() {
        var tilecount = 0;
        for (var y = 0; y < this.map.length; y++) {
            for (var x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] == 1) {
                    tilecount++;
                }
            }
        }
        return tilecount;
    };
    this.exploreAdjacent = function(x, y) {
        this.map[y][x] = 5;
        if (this.map[y][x + 1] == 1) {
            this.exploreAdjacent(x + 1, y);
        }
        if (this.map[y][x - 1] == 1) {
            this.exploreAdjacent(x - 1, y);
        }
        if (this.map[y+1][x] == 1) {
            this.exploreAdjacent(x, y + 1);
        }
        if (this.map[y-1][x] == 1) {
            this.exploreAdjacent(x, y - 1);
        }
    };
    this.isConnected = function() {
        for (var y = 0; y < this.map.length; y++) {
            for (var x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] == 1) {
                    this.exploreAdjacent(x, y);
                    return;
                }
            }
        }
    };
    this.Generate();
    return this.Convert(this.map);
};

Game.populateDungeons = function(levels) {
    for (var i = 0; i < levels.length - 1; i++) {
        var max = levels[i].groundLayer[0].length;
        var x = Helpers.GetRandom(1, max);
        var y = Helpers.GetRandom(1, max);
        if (Game.checktile(x, y, levels[i])) {
            if (Game.checktile(x, y, levels[i + 1])) {
                new Game.Stairs("<", "Blue", levels[i + 1].name, x, y, levels[i].name);
                new Game.Stairs(">", "Blue", levels[i].name, x, y, levels[i + 1].name);
                console.log(levels[i].name + " to " + levels[i + 1].name + " Stairs are found at X:" + x + " Y:" + y);
            } else {
                i--;
            }
        } else {
            i--;
        }
    }
    for (var i = 0; i < levels.length - 1; i++) {
        for (var x = 0; x < 5; x++) {
            Game.spawnCreature(levels[i]);
        }
    }

};

Game.spawnCreature = function(level) {
    var diff = level.difficulty;
    var roll = Helpers.GetRandom(1, 100);

    if (diff == 1) {
        if (roll <= 65) {
            Game.spawnLevel1Creature(level);
        } else if (roll <= 85) {
            Game.spawnLevel2Creature(level);
        } else {
            Game.spawnLevel3Creature(level);
        }
    }

    if (diff == 2) {
        if (roll <= 35) {
            Game.spawnLevel1Creature(level);
        } else if (roll <= 65) {
            Game.spawnLevel2Creature(level);
        } else if (roll <= 85) {
            Game.spawnLevel3Creature(level);
        } else {
            Game.spawnLevel4Creature(level);
        }
    }

    if (diff == 3) {
        if (roll <= 15) {
            Game.spawnLevel1Creature(level);
        } else if (roll <= 35) {
            Game.spawnLevel2Creature(level);
        } else if (roll <= 65) {
            Game.spawnLevel3Creature(level);
        } else if (roll <= 85) {
            Game.spawnLevel4Creature(level);
        } else {
            Game.spawnLevel5Creature(level);
        }
    }

    if (diff == 4) {
        if (roll <= 15) {
            Game.spawnLevel2Creature(level);
        } else if (roll <= 35) {
            Game.spawnLevel3Creature(level);
        } else if (roll <= 65) {
            Game.spawnLevel4Creature(level);
        } else if (roll <= 85) {
            Game.spawnLevel5Creature(level);
        } else {
            Game.spawnLevel6Creature(level);
        }
    }

};

Game.spawnLevel1Creature = function(level) {
    var xy = Game.getRandomClearXY(level);
    if (Helpers.GetRandom(0,1) == 1) {
        new Game.CreatureTemplates.Rat(xy.x, xy.y, level.name);
    } else {
        new Game.CreatureTemplates.Beetle(xy.x, xy.y, level.name);
    }
};

Game.spawnLevel2Creature = function(level) {
    var xy = Game.getRandomClearXY(level);
    new Game.CreatureTemplates.Bat(xy.x, xy.y, level.name);
};

Game.spawnLevel3Creature = function(level) {
    var xy = Game.getRandomClearXY(level);
    new Game.CreatureTemplates.Turtle(xy.x, xy.y, level.name);
};

Game.spawnLevel4Creature = function(level) {
    var xy = Game.getRandomClearXY(level);
    new Game.CreatureTemplates.LargeRat(xy.x, xy.y, level.name);
};

Game.spawnLevel5Creature = function(level) {
    var xy = Game.getRandomClearXY(level);
    new Game.CreatureTemplates.Jester(xy.x, xy.y, level.name);
};

Game.spawnLevel6Creature = function(level) {
    var xy = Game.getRandomClearXY(level);
    new Game.CreatureTemplates.MinorDragon(xy.x, xy.y, level.name);
};