Game.Tiles.testTile = new Game.Tile(true, "_", "Black");
Game.Tiles.centerTile = new Game.Tile(true, "X", "Green");
Game.Tiles.nullTile = new Game.Tile(false, "?", "White");

var testObject = new Game.GameObject("dummy", "a", "Pink", false, {
	health : 0,
	maxhealth : 0,
	attack : 2
}, function() {
}, 2, 3);

var testObject2 = new Game.GameObject("dummy", "h", "Red", false, {
	health : 0,
	maxhealth : 0,
	attack : 2
}, function() {
}, 20, 12);

var lvl1stairs = new Game.GameObject("Stairs", "<", "Green", true, {}, function(actor) {

	if (Game.getPlayerIndexSafely(actor.name, Game.findLevel(actor.level, levels))) {
		Game.findLevel(actor.level, levels).objects.splice(Game.getPlayerIndexSafely(actor.name, Game.findLevel(actor.level, levels)), 0);

	}

	actor.level = "testLevel2";
	Game.findLevel(actor.level, levels).objects.push(actor);

},24, 10);
var lvl2stairs = new Game.GameObject("Stairs", "<", "Green", true, {}, function(actor) {

	if (Game.getPlayerIndexSafely(actor.name, Game.findLevel(actor.level, levels))) {
		Game.findLevel(actor.level, levels).objects.splice(Game.getPlayerIndexSafely(actor.name, Game.findLevel(actor.level, levels)), 0);

	}

	actor.level = "testLevel1";
	Game.findLevel(actor.level, levels).objects.push(actor);

},24, 10);


testLevel1 = {
	name : "testLevel1",
	groundLayer : [],
	objects : [testObject, lvl1stairs]
};

testLevel2 = {
	name : "testLevel2",
	groundLayer : [],
	objects : [lvl2stairs, testObject2]
};

var testPlayer = new Game.Player("#0000ff", "anders", 15, 15);
var testPlayer2 = new Game.Player("Red", "testuser", 4, 6);
testPlayer2.level = "testLevel2";

testLevel1.objects.push(testPlayer);
testLevel2.objects.push(testPlayer2);

playerList = [testPlayer, testPlayer2];

for (var i = 0; i < 30; i++) {
	testLevel1.groundLayer.push([]);
	for (var x = 0; x < 30; x++) {
		if (i == 15 && x == 15) {
			testLevel1.groundLayer[i].push(Game.Tiles.centerTile);
		} else {
			testLevel1.groundLayer[i].push(Game.Tiles.testTile);
		}

	}
}

for (var i = 0; i < 30; i++) {
	testLevel2.groundLayer.push([]);
	for (var x = 0; x < 30; x++) {
		if (i == 15 && x == 15) {
			testLevel2.groundLayer[i].push(Game.Tiles.centerTile);
		} else {
			testLevel2.groundLayer[i].push(Game.Tiles.testTile);
		}

	}
}

levels = [testLevel1, testLevel2];
