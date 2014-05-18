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

var lvl0stairs = new Game.Stairs("<", "Brown", "testLevel1", 14, 12);

var lvl1stairs = new Game.Stairs("<", "Green", "testLevel2", 24, 10);

var lvl1stairs2 = new Game.Stairs(">", "Brown", "testLevel0", 14, 12);

var lvl2stairs = new Game.Stairs(">", "Green", "testLevel1", 24, 10);

testLevel0 = {
	name : "testLevel0",
	groundLayer : [],
	objects : [lvl0stairs]
};

testLevel1 = {
	name : "testLevel1",
	groundLayer : [],
	objects : [testObject, lvl1stairs, lvl1stairs2]
};

testLevel2 = {
	name : "testLevel2",
	groundLayer : [],
	objects : [lvl2stairs, testObject2]
};

var testPlayer = new Game.Player("#0000ff", "anders", 13, 17);
var testPlayer2 = new Game.Player("Red", "testuser", 4, 6);
testPlayer2.level = "testLevel2";

testLevel1.objects.push(testPlayer);
testLevel2.objects.push(testPlayer2);

playerList = [testPlayer, testPlayer2];

for (var i = 0; i < 30; i++) {
	testLevel0.groundLayer.push([]);
	testLevel1.groundLayer.push([]);
	testLevel2.groundLayer.push([]);
	for (var x = 0; x < 30; x++) {
		if (i == 15 && x == 15) {
			testLevel0.groundLayer[i].push(Game.Tiles.centerTile);
			testLevel1.groundLayer[i].push(Game.Tiles.centerTile);
			testLevel2.groundLayer[i].push(Game.Tiles.centerTile);
		} else {
			testLevel0.groundLayer[i].push(Game.Tiles.testTile);
			testLevel1.groundLayer[i].push(Game.Tiles.testTile);
			testLevel2.groundLayer[i].push(Game.Tiles.testTile);
		}

	}
}

levels = [testLevel0, testLevel1, testLevel2];
