Game.Tiles.push(new Game.Tile(0, false, "?", "White"));
Game.Tiles.push(new Game.Tile(1, true, "_", "Brown"));
Game.Tiles.push(new Game.Tile(2, false, "#", "Black"));
Game.Tiles.push(new Game.Tile(3, true, "_", "Black"));
Game.Tiles.push(new Game.Tile(4, false, "#", "Grey"));

Game.Items.sharpStick = new Game.Weapon("Sharp Stick", 1, 1);
Game.Items.woodenClub = new Game.Weapon("Wooden Club", 1, 1);
Game.Items.woodenSword = new Game.Weapon("Wooden Sword", 1, 1);
Game.Items.ironSword = new Game.Weapon("Iron Sword", 2, 10);

Game.Items.loinCloth = new Game.Armor("Loin Cloth", 2, 0, 1);
Game.Items.breastPlate = new Game.Armor("Iron Breast Plate", 3, 2, 10);
Game.Items.plateLeggings = new Game.Armor("Plate leggins", 3, 1, 10);

new Game.Level("Level0", Game.makeDungeon(64), 1);

new Game.Level("Level1", Game.makeDungeon(64), 2);

new Game.Level("Level2", Game.makeDungeon(64), 3);

new Game.Level("Level3", Game.makeDungeon(64), 4);

new Game.Level("Level4", Game.makeDungeon(64), 4);

new Game.Level("Level5", Game.makeDungeon(64), 5);

var xy = Game.getRandomClearXY(Game.findLevel("Level0", Game.Levels));

console.log(xy);

new Game.itemContainer("o", "Pink", {
    weapon : [Game.Items.ironSword],
    armor : [Game.Items.breastPlate, Game.Items.breastPlate]
}, xy.x, xy.y, "Level0");

Game.populateDungeons(Game.Levels);

Game.distributeObjects(Game.Objects, Game.Levels);
