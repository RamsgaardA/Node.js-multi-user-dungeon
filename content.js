Game.Tiles.groundTile = new Game.Tile(true, "_", "Brown");
Game.Tiles.wallTile = new Game.Tile(false, "#", "Black");
Game.Tiles.indoorTile = new Game.Tile(true, "_", "Black");
Game.Tiles.centerTile = new Game.Tile(true, "X", "Green");
Game.Tiles.nullTile = new Game.Tile(false, "?", "White");

Game.Items.sharpStick = new Game.Weapon("Sharp Stick", 1, 1);
Game.Items.woodenClub = new Game.Weapon("Wooden Club", 1, 1);
Game.Items.woodenSword = new Game.Weapon("Wooden Sword", 1, 1);
Game.Items.ironSword = new Game.Weapon("Iron Sword", 2, 10);

Game.Items.loinCloth = new Game.Armor("Loin Cloth", 2, 0, 1);
Game.Items.breastPlate = new Game.Armor("Iron Breast Plate", 3, 2, 10);

var testObject2 = new Game.GameObject("dummy", "h", "Red", false, {
    health : 0,
    maxhealth : 0,
    attack : 2
}, function() {
}, 20, 12, "testLevel2");

var testCreature = new Game.HostileCreature("j", "Jester", "Red", {
    hp : 20,
    mhp : 20,
    atk : 4,
    def : 2,
    agi : 1
}, 5, 16, "testLevel0");

var testCreature2 = new Game.HostileCreature("D", "Demon Lord", "Red", {
    hp : 200,
    mhp : 200,
    atk : 20,
    def : 5,
    agi : 5
}, 6, 18, "testLevel0");


var testEquipment = new Game.GameObject("Equpiment", "c", "Yellow", false, {}, function(actor) {
    actor.contents.weapon = [Game.Items.woodenClub];
    actor.appendMessage("Got a wooden club!");

}, 20, 20, "testLevel1");

var lvl0stairs = new Game.Stairs("<", "Brown", "testLevel1", 14, 12, "testLevel0");

var lvl1stairs = new Game.Stairs("<", "Green", "testLevel2", 24, 10, "testLevel1");

var lvl1stairs2 = new Game.Stairs(">", "Brown", "testLevel0", 14, 12, "testLevel1");

var lvl2stairs = new Game.Stairs(">", "Green", "testLevel1", 24, 10, "testLevel2");

var testLevel0 = new Game.Level("testLevel0", Game.Maps[0]);

var testLevel1 = new Game.Level("testLevel1", Game.Maps[1]);

var testLevel2 = new Game.Level("testLevel2", Game.Maps[2]);

var testPlayer = new Game.Player("#0000ff", "anders", {
    str : 20,
    agi : 20,
    con : 20,
    hp : 200,
    mhp : 200,
    weapon : [Game.Items.ironSword],
    armor : [Game.Items.breastPlate]
}, 13, 17);

var testPlayer2 = new Game.Player("Red", "testuser", Game.generatePlayerStats(), 4, 6);
testPlayer2.level = "testLevel2";

Game.distributeObjects(Game.Objects, Game.Levels);
