var socket = io.connect('http://localhost:3700');
Client = {};
Client.owner = "";

console.log("IO");

socket.on('welcome', function(data) {
    Client.Render(data.snapshot);
    document.getElementById("session").innerHTML = "Session ID: " + data.id;
    Client.owner = data.id;
    console.log(data);
});

socket.on('snap', function(data) {
    Client.Render(data.snapshot);
    console.log(data);
    currentsnap = data;
});


window.addEventListener("keydown", dealWithKeyboard, false);
 
function dealWithKeyboard(e) {
    console.log(e);
    socket.emit('keypress', {
        key : e.keyCode,
        owner : Client.owner
    });
}