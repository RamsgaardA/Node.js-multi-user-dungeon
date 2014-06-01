var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();
var sio = require("socket.io");
var gameclasses = require('./gameclasses.js');
var creatureclasses = require('./creatureTemplates.js');
var dungeongen = require('./dungeongen.js');
var game = require('./game.js');
var gamecontent = require('./content.js');

/* serves main page */
app.use(express['static'](__dirname + '/public'));
app.get("/", function(req, res) {
    res.render("index.html");
});

var port = 3700;
var io = sio.listen(app.listen(port), {
    log : false
});

var chatMessages = [];
var clientIndex = {};

function updateChat(msg) {

    if (chatMessages.length < 10) {
        chatMessages.push(msg);
        return chatMessages;
    } else {
        chatMessages.shift();
        chatMessages.push(msg);
        return chatMessages;
    }
}

function save() {
    var JSONifiedLevels = "[";
    fs.writeFile('save/objects.json', JSON.stringify(Game.Objects), function(err) {
        if (err)
            throw err;
    });
    for (var i = 0; i < Game.Levels.length; i++) {
        var processedLevel = JSON.parse(JSON.stringify(Game.Levels[i]));
        processedLevel.objects = [];
        processedLevel.groundLayer = Game.compressMap(Game.Levels[i].groundLayer);
        JSONifiedLevels += JSON.stringify(processedLevel) + ",";
    }
    JSONifiedLevels = JSONifiedLevels.substring(0, JSONifiedLevels.length - 1);
    JSONifiedLevels += "]";
    fs.writeFile('save/levels.json', JSONifiedLevels, function(err) {
        if (err)
            throw err;
    });
    console.log('It\'s saved!');

}

function load() {
    Game.Players = [];
    Game.Creatures = [];
    Game.Objects = [];
    Game.Levels = [];
    var objectsToParse = fs.readFileSync('save/objects.json', {
        encoding : 'utf-8'
    });
    parsedObjects = JSON.parse(objectsToParse);
    for (var i = 0; i < parsedObjects.length; i++) {
        if (parsedObjects[i].type == "Creature") {
            new Game.HostileCreature(parsedObjects[i].symbol, parsedObjects[i].name, parsedObjects[i].color, parsedObjects[i].stats, parsedObjects[i].x, parsedObjects[i].y, parsedObjects[i].level);
        } else if (parsedObjects[i].type == "Stairs") {
            new Game.Stairs(parsedObjects[i].symbol, parsedObjects[i].color, parsedObjects[i].leadsto, parsedObjects[i].x, parsedObjects[i].y, parsedObjects[i].level);
        } else if (parsedObjects[i].type == "Player") {
            new Game.Player(parsedObjects[i].color, parsedObjects[i].owner, parsedObjects[i].contents, parsedObjects[i].x, parsedObjects[i].y, parsedObjects[i].level);
        } else if (parsedObjects[i].type == "ItemContainer") {
            new Game.itemContainer(parsedObjects[i].symbol, parsedObjects[i].color, parsedObjects[i].contents, parsedObjects[i].x, parsedObjects[i].y, parsedObjects[i].level);
        }
    }
    var levelsToParse = fs.readFileSync('save/levels.json', {
        encoding : 'utf-8'
    });
    parsedLevels = JSON.parse(levelsToParse);
    for (var i = 0; i < parsedLevels.length; i++) {
        new Game.Level(parsedLevels[i].name, parsedLevels[i].groundLayer, parsedLevels[i].difficulty);
    }
    Game.distributeObjects(Game.Objects, Game.Levels);
}

function getClient(key) {
    return clientIndex[key];
}

function setClient(key, value) {
    clientIndex[key] = value;
}

function uniqueid() {
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        var ascicode = Math.floor((Math.random() * 42) + 48);
        if (ascicode < 58 || ascicode > 64) {
            idstr += String.fromCharCode(ascicode);
        }
    } while (idstr.length<16);

    return (idstr);
}

//load();

io.sockets.on('connection', function(socket) {
    var address = socket.handshake.address;
    var id = "";
    console.log(address.address + " connected to the server.");
    socket.on('StartGame', function() {
        id = uniqueid();
        console.log(id + " has been thrown into the dungeons.");
        Game.spawnPlayer(id, socket.sessionid);
        socket.emit('welcome', {
            snapshot : Game.makeSnap(id),
            id : id
        });
        setClient(id, socket.id);
    });
    socket.on('chat', function(data) {
        console.log(id + " Is saying: " + data.chatMessage);
        io.sockets.emit('chatupdate', {
            chatmessages : updateChat(data.chatMessage)
        });

    });
    socket.on('keypress', function(data) {
        Game.handleKey(data);
        Game.update();
        if (Game.getNearbyPlayers(Game.checkPlayer(Game.Players, id))) {
            var playersToUpdate = Game.getNearbyPlayers(Game.checkPlayer(Game.Players, id));
            for (var ix = 0; ix < playersToUpdate.length; ix++) {
                io.sockets.socket(getClient(playersToUpdate[ix].owner)).emit('snap', {
                    snapshot : Game.makeSnap(playersToUpdate[ix].owner)
                });
            }
        }
        if (data.key == 83)
            save();
        socket.emit('snap', {
            snapshot : Game.makeSnap(id)
        });
    });
    socket.on('changeid', function(data) {
        console.log(id + " Has changed session to: " + data.newid);
        id = data.newid;
        socket.emit('snap', {
            snapshot : Game.makeSnap(id)
        });
    });
    socket.on('re:update', function() {
        socket.emit('snap', {
            snapshot : Game.makeSnap(id)
        });
    });
});
