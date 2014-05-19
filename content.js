Game.Tiles.testTile = new Game.Tile(true, "_", "Black");
Game.Tiles.centerTile = new Game.Tile(true, "X", "Green");
Game.Tiles.nullTile = new Game.Tile(false, "?", "White");

var testObject = new Game.GameObject("dummy", "a", "Pink", false, {
	health : 0,
	maxhealth : 0,
	attack : 2
}, function() {
}, 2, 3, "testLevel1");

var testObject2 = new Game.GameObject("dummy", "h", "Red", false, {
	health : 0,
	maxhealth : 0,
	attack : 2
}, function() {
}, 20, 12, "testLevel2");

var testCreature = new Game.GameObject("Creature", "j", "Red", false, {
	str : 4,
	agi : 4,
	con : 4,
	hp : 100,
	mhp : 100,
	pdam : 1,
	sdam : 2,
	bdam : 1
}, function(actor) {

	this.contents.hp -= actor.contents.str * actor.contents.weapon[0].piercing * (Math.random() * 10 + actor.contents.agi);

	actor.contents.hp -= this.contents.str * this.contents.sdam * (Math.random() * 10 + this.contents.agi);
	actor.appendMessage("You hurt the creature");
	if (this.contents.hp < 0) {
		console.log("hp < 0");
		Game.findLevel(this.level, Game.Levels).objects.splice(Game.findObjectIndex(this, Game.findLevel(this.level, Game.Levels).objects), 1);
		actor.appendMessage("You slay the creature");
	}

}, 5, 16, "testLevel0");

var lvl0stairs = new Game.Stairs("<", "Brown", "testLevel1", 14, 12, "testLevel0");

var lvl1stairs = new Game.Stairs("<", "Green", "testLevel2", 24, 10, "testLevel1");

var lvl1stairs2 = new Game.Stairs(">", "Brown", "testLevel0", 14, 12, "testLevel1");

var lvl2stairs = new Game.Stairs(">", "Green", "testLevel1", 24, 10, "testLevel2");

testLevel0 = new Game.Level("testLevel0");

testLevel1 = new Game.Level("testLevel1");

testLevel2 = new Game.Level("testLevel2");

var testPlayer = new Game.Player("#0000ff", "anders", 13, 17);
var testPlayer2 = new Game.Player("Red", "testuser", 4, 6);
testPlayer2.level = "testLevel2";

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

Game.distributeObjects(Game.Objects, Game.Levels);
