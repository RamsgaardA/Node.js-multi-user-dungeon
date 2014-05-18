var socket = io.connect('http://localhost:3700');
Client = {};
Client.owner = "";

console.log("IO");

socket.on('welcome', function(data) {
    Client.Render(data.snapshot);
    document.getElementById("session").innerHTML = "Session ID: " + data.id;
    Client.owner = data.id;
    //console.log(data);
});

socket.on('snap', function(data) {
    Client.Render(data.snapshot);
    //console.log(data);
    currentsnap = data;
});

socket.on('update', function() {
    socket.emit('re:update');
});

socket.on('chatupdate', function(data){
	//console.log(data);
	var chatstrout = "Chat messages: <br>";
	for(var i = 0; i < data.chatmessages.length; i++){
		chatstrout+= data.chatmessages[i] + "<br>";
	}
	document.getElementById("chatbox").innerHTML = chatstrout;
	
});

window.addEventListener("keydown", dealWithKeyboard, false);
 
function dealWithKeyboard(e) {
    console.log(e);
    socket.emit('keypress', {
        key : e.keyCode,
        owner : Client.owner
    });
}