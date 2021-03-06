//Draws the snapshot on the canvas
Client.Render = function(snapshot) {
    //Declare variables
    var canvas = document.getElementById("Canvas");
    var consoleout = document.getElementById("console");
    var statsout = document.getElementById("stats");
    consoleout.innerHTML = " ";
    statsout.innerHTML = " ";
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var x = 0;
    var y = 0;
    //calculate and set spacing between characters
    var xspacing = (width / snapshot.groundLayer.length);
    var yspacing = (height / snapshot.groundLayer[0].length);
    // Clear the canvas before drawing the next frame
    ctx.clearRect(x, y, width, height);
    //set the font
    ctx.font = xspacing + "px Courier";
    //iterate through the snapshot tiles
    ctx.fillStyle = "Blue";
    for (var iy = 0; iy < snapshot.groundLayer.length; iy++) {
        for (var ix = 0; ix < snapshot.groundLayer[iy].length; ix++) {
            //Is there an object here?
            if (Client.Render.checkObjects(snapshot.objects, ix, iy)) {
                var objectToRender = Client.Render.checkObjects(snapshot.objects, ix, iy);
                ctx.fillStyle = objectToRender.color;
                ctx.fillText(objectToRender.symbol, x + 22, y + 22);
                //if the option "Show Object Names" is checked, show object types and creature names
                if (document.getElementById("nameoption").checked == true) {
                    ctx.font = xspacing / 2 + "px Courier";
                    ctx.fillText(objectToRender.type, x - (objectToRender.type.length * xspacing / 2) / 4 + 25, y - 5);
                    if (objectToRender.type == "Creature") {
                        ctx.fillText(objectToRender.name, x - (objectToRender.name.length * xspacing / 2) / 4 + 25, y + 40);
                    }
                    ctx.font = xspacing + "px Courier";
                }

            } else {
                //There was no object, render the groundtile.
                ctx.fillStyle = snapshot.groundLayer[iy][ix].color;
                ctx.fillText(snapshot.groundLayer[iy][ix].symbol, x + 22, y + 22);
            }
            x += xspacing;
        }
        y += yspacing;
        x = 0;

    }
    if (Client.Render.lookForPlayer(snapshot.objects, Client.owner)) {
        var messages = Client.Render.lookForPlayer(snapshot.objects, Client.owner).messages;
        for (var i = 0; i < messages.length; i++) {
            consoleout.innerHTML += messages[i] + "<br>";
        }
    }
    if (Client.Render.lookForPlayer(snapshot.objects, Client.owner)) {
        var player = Client.Render.lookForPlayer(snapshot.objects, Client.owner);
        statsout.innerHTML = ("At: " + player.level + ", X: " + player.trueX + ", Y: " + player.trueY + "<br>" + "Stats: str: " + player.contents.str + ", agi: " + player.contents.agi + ", con: " + player.contents.con + ", lvl: " + player.contents.level + ", HP: " + player.contents.hp + ", MHP: " + player.contents.mhp
        );
    }

};

//Check if there's an object at the X Y coordinates
//return it if there is
Client.Render.checkObjects = function(objects, x, y) {
    for (var a = 0; a < objects.length; a++) {
        if (objects[a].x == x && objects[a].y == y) {
            return objects[a];
        }
    }
    return false;
};

//Loop through all objects, find players, look for specific player.
Client.Render.lookForPlayer = function(objects, playername) {
    for (var a = 0; a < objects.length; a++) {
        if (objects[a].type == "Player") {
            if (objects[a].owner == playername) {
                return objects[a];
            }
        }
    }
    return false;
};
