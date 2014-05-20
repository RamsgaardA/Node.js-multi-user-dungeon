Game.Tiles.groundTile = new Game.Tile(true, "_", "Brown");
Game.Tiles.wallTile = new Game.Tile(false, "#", "Black");
Game.Tiles.indoorTile = new Game.Tile(true, "_", "Black");
Game.Tiles.centerTile = new Game.Tile(true, "X", "Green");
Game.Tiles.nullTile = new Game.Tile(false, "?", "White");

Game.Items.sharpStick = new Game.Weapon("Sharp Stick", 1, 2, 1, 1);
Game.Items.woodenClub = new Game.Weapon("Wooden Club", 1, 1, 1, 2);
Game.Items.woodenSword = new Game.Weapon("Wooden Sword", 1, 1, 2, 1);

Game.Items.loinCloth = new Game.Armor("Loin Cloth", 2, 0, 1, 1, 1);

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
        Game.findLevel(this.level, Game.Levels).objects.splice(Game.findObjectIndex(this, Game.findLevel(this.level, Game.Levels).objects), 1);
        Game.Objects.splice(Game.findObjectIndex(this, Game.Objects), 1);
        actor.appendMessage("You slay the creature");
    }

}, 5, 16, "testLevel0");

testCreature.move = function() {
    var fx = Math.round(Math.random());
    var bx = Math.round(Math.random());
    var fy = Math.round(Math.random());
    var by = Math.round(Math.random());

    if (Math.round(Math.random()) == 1) {
        if (Game.checktile(this.x + fx - bx, this.y, Game.findLevel(this.level, Game.Levels))) {
            this.x += fx;
            this.x -= bx;
        }
    } else {
        if (Game.checktile(this.x, this.y + fy - by, Game.findLevel(this.level, Game.Levels))) {
            this.y += fy;
            this.y -= by;
        }
    }
};

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
    weapon : [Game.Items.woodenSword],
    armor : [Game.Items.loinCloth]
}, 13, 17);

var testPlayer2 = new Game.Player("Red", "testuser", Game.generatePlayerStats(), 4, 6);
testPlayer2.level = "testLevel2";

Game.distributeObjects(Game.Objects, Game.Levels);
