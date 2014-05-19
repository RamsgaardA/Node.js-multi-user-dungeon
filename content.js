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

var testEquipment = new Game.GameObject("Equpiment", "c", "Yellow", false, {}, function(actor){
	var club = new Game.Weapon("Club", 3, 0, 0, 4);
	actor.contents.weapon = [club];
	actor.appendMessage("Got a club!");
	
}, 20,20, "testLevel1");

var lvl0stairs = new Game.Stairs("<", "Brown", "testLevel1", 14, 12, "testLevel0");

var lvl1stairs = new Game.Stairs("<", "Green", "testLevel2", 24, 10, "testLevel1");

var lvl1stairs2 = new Game.Stairs(">", "Brown", "testLevel0", 14, 12, "testLevel1");

var lvl2stairs = new Game.Stairs(">", "Green", "testLevel1", 24, 10, "testLevel2");

var testLevel0 = new Game.Level("testLevel0", Game.Maps[0]);

var testLevel1 = new Game.Level("testLevel1", Game.Maps[1]);

var testLevel2 = new Game.Level("testLevel2", Game.Maps[2]);

var testPlayer = new Game.Player("#0000ff", "anders", 13, 17);
var testPlayer2 = new Game.Player("Red", "testuser", 4, 6);
testPlayer2.level = "testLevel2";

Game.distributeObjects(Game.Objects, Game.Levels);