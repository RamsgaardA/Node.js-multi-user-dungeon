var express = require("express");
var app = express();
var redis = require("redis");
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

var client = redis.createClient()
var port = 3700;
var io = sio.listen(app.listen(port), {
	log : false
});

io.set("store", new sio.RedisStore);

var chatMessages = [];

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

io.sockets.on('connection', function(socket) {
	var id = "";

	socket.on('StartGame', function() {
		id = uniqueid();

		Game.spawnPlayer(id, socket.sessionid);
		socket.emit('welcome', {
			snapshot : Game.makeSnap(id),
			id : id
		});
		client.set(id, socket.id, function(err) {
			if (err)
				throw err;
			console.log(id + " is linked to " + socket.id);
		});
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
				
				client.get(playersToUpdate[ix].owner, function(err, socketId) {
					if (err) {
						throw err;
					}
					
					io.sockets.socket(socketId).emit('update');
				});
			}
		}
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
