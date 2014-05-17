var express = require("express");
var app = express();
var game = require('./game.js');

/* serves main page */
app.use(express['static'](__dirname + '/public'));
app.get("/", function(req, res) {
    res.render("index.html");
});

var port = 3700;
var io = require('socket.io').listen(app.listen(port));

function uniqueid() {
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        var ascicode = Math.floor((Math.random() * 42) + 48);
        if (ascicode < 58 || ascicode > 64) {
            idstr += String.fromCharCode(ascicode);
        }
    } while (idstr.length<32);

    return (idstr);
}

io.sockets.on('connection', function(socket) {
    var id = uniqueid();
    socket.emit('welcome', {
        snapshot : Game.makeSnap(id, testSnap),
        id : id
    });
    socket.on('keypress', function(data) {
        Game.handleKey(data);
        io.sockets.emit('update');
    });
    socket.on('changeid', function(data) {
        id = data.newid;
        socket.emit('snap', {
            snapshot : Game.makeSnap(id, testSnap)
        });
    });
    socket.on('re:update', function(){
        socket.emit('snap', {
            snapshot : Game.makeSnap(id, testSnap)
        });
    });
});
