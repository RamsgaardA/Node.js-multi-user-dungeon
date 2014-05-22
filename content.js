Game.Tiles.groundTile = new Game.Tile(true, "_", "Brown");
Game.Tiles.wallTile = new Game.Tile(false, "#", "Black");
Game.Tiles.indoorTile = new Game.Tile(true, "_", "Black");
Game.Tiles.centerTile = new Game.Tile(true, "#", "Grey");
Game.Tiles.nullTile = new Game.Tile(false, "?", "White");

Game.Items.sharpStick = new Game.Weapon("Sharp Stick", 1, 1);
Game.Items.woodenClub = new Game.Weapon("Wooden Club", 1, 1);
Game.Items.woodenSword = new Game.Weapon("Wooden Sword", 1, 1);
Game.Items.ironSword = new Game.Weapon("Iron Sword", 2, 10);

Game.Items.loinCloth = new Game.Armor("Loin Cloth", 2, 0, 1);
Game.Items.breastPlate = new Game.Armor("Iron Breast Plate", 3, 2, 10);

new Game.GameObject("dummy", "h", "Red", false, {
    health : 0,
    maxhealth : 0,
    attack : 2
}, function(actor) {
    actor.contents.hp = actor.contents.mhp;
    actor.appendMessage("You have been healed!");
}, 20, 12, "testLevel2");

new Game.HostileCreature("r", "Rat", "Brown", {
    hp : 5,
    mhp : 5,
    atk : 1,
    def : 1,
    agi : 1,
    exp : 5
}, 5, 16, "testLevel2");

new Game.HostileCreature("r", "Rat", "Brown", {
    hp : 5,
    mhp : 5,
    atk : 1,
    def : 1,
    agi : 1,
    exp : 5
}, 10, 14, "testLevel2");

new Game.HostileCreature("j", "Jester", "Red", {
    hp : 30,
    mhp : 30,
    atk : 10,
    def : 5,
    agi : 3,
    exp : 20
}, 5, 16, "testLevel0");

new Game.HostileCreature("D", "Big Mean Scary Thing", "Red", {
    hp : 200,
    mhp : 200,
    atk : 20,
    def : 5,
    agi : 5,
    exp : 200
}, 1, 1, "testLevel1");


new Game.GameObject("Equpiment", "c", "Yellow", false, {}, function(actor) {
    actor.contents.weapon = [Game.Items.woodenClub];
    actor.appendMessage("Got a wooden club!");

}, 20, 20, "testLevel1");

new Game.Stairs("<", "Brown", "testLevel1", 14, 12, "testLevel0");

new Game.Stairs("<", "Green", "testLevel2", 24, 10, "testLevel1");

new Game.Stairs(">", "Brown", "testLevel0", 14, 12, "testLevel1");

new Game.Stairs(">", "Green", "testLevel1", 24, 10, "testLevel2");

new Game.Level("testLevel0", Game.makeDungeon(64));

new Game.Level("testLevel1", Game.Maps[1]);

new Game.Level("testLevel2", Game.Maps[2]);

 new Game.Player("#0000ff", "anders", {
    str : 15,
    agi : 10,
    con : 12,
    hp : 200,
    mhp : 200,
    level : 14,
    exp : 200,
    weapon : [Game.Items.ironSword],
    armor : [Game.Items.breastPlate]
}, 13, 17, "testLevel1");

var testPlayer2 = new Game.Player("Red", "testuser", Game.generatePlayerStats(), 4, 6, "testLevel2");

Game.distributeObjects(Game.Objects, Game.Levels);