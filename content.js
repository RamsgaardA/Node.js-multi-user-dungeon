Game.Tiles.groundTile = new Game.Tile(true, "_", "Brown");
Game.Tiles.wallTile = new Game.Tile(false, "#", "Black");
Game.Tiles.indoorTile = new Game.Tile(true, "_", "Black");
Game.Tiles.centerTile = new Game.Tile(false, "#", "Grey");
Game.Tiles.nullTile = new Game.Tile(false, "?", "White");

Game.Items.sharpStick = new Game.Weapon("Sharp Stick", 1, 1);
Game.Items.woodenClub = new Game.Weapon("Wooden Club", 1, 1);
Game.Items.woodenSword = new Game.Weapon("Wooden Sword", 1, 1);
Game.Items.ironSword = new Game.Weapon("Iron Sword", 2, 10);

Game.Items.loinCloth = new Game.Armor("Loin Cloth", 2, 0, 1);
Game.Items.breastPlate = new Game.Armor("Iron Breast Plate", 3, 2, 10);



new Game.Level("testLevel0", Game.makeDungeon(64));

new Game.Level("testLevel1", Game.makeDungeon(64));

new Game.Level("testLevel2", Game.makeDungeon(64));

Game.populateDungeons(Game.Levels);

Game.distributeObjects(Game.Objects, Game.Levels);
