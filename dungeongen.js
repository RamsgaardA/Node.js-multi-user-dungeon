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
    this.Generate = function() {
        this.map = [];
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

        this.SquashRooms();

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
    this.SquashRooms = function() {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < this.rooms.length; j++) {
                var room = this.rooms[j];
                while (true) {
                    var old_position = {
                        x : room.x,
                        y : room.y
                    };
                    if (room.x > 1)
                        room.x--;
                    if (room.y > 1)
                        room.y--;
                    if ((room.x == 1) && (room.y == 1))
                        break;
                    if (this.DoesCollide(room, j)) {
                        room.x = old_position.x;
                        room.y = old_position.y;
                        break;
                    }
                }
            }
        }
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
                } else {
                    newmap[y].push(map[y][x]);
                }

            }
        }
        return newmap;
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
    for (var i = 0; i < levels.length - 1; i++){
        for(var x = 0; x < 5; x++){
            Game.spawnCreature(levels[i]);
        }
    }
    
};
