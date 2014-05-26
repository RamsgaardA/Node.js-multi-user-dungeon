Game.CreatureTemplates.Rat = function(x, y, level) {
    this.id = Game.objectID();
    this.type = "Creature";
    this.name = "Rat";
    this.symbol = "r";
    this.color = "Brown";
    this.isWalkable = false;
    
    this.contents = {
        difficulty : 1,
        hp : 10,
        mhp : 10,
        atk : 1,
        def : 1,
        agi : 1,
        exp : 5
    };
    
    this.func = function(actor) {
        Game.fight(actor, this);
    };
    this.x = x;
    this.y = y;
    this.level = level;
    this.move = Game.moveRandomly;
    Game.Objects.push(this);
    Game.Creatures.push(this);
};

Game.CreatureTemplates.Beetle = function(x, y, level) {
    this.id = Game.objectID();
    this.type = "Creature";
    this.name = "Beetle";
    this.symbol = "b";
    this.color = "Grey";
    this.isWalkable = false;
    
    this.contents = {
        difficulty : 1,
        hp : 5,
        mhp : 5,
        atk : 1,
        def : 5,
        agi : 1,
        exp : 5
    };
    
    this.func = function(actor) {
        Game.fight(actor, this);
    };
    this.x = x;
    this.y = y;
    this.level = level;
    this.move = Game.moveRandomly;
    Game.Objects.push(this);
    Game.Creatures.push(this);
};

Game.CreatureTemplates.Bat = function(x, y, level) {
    this.id = Game.objectID();
    this.type = "Creature";
    this.name = "Bat";
    this.symbol = "b";
    this.color = "Black";
    this.isWalkable = false;
    
    this.contents = {
        difficulty : 2,
        hp : 20,
        mhp : 20,
        atk : 4,
        def : 2,
        agi : 3,
        exp : 10
    };
    
    this.func = function(actor) {
        Game.fight(actor, this);
    };
    this.x = x;
    this.y = y;
    this.level = level;
    Game.Objects.push(this);
    Game.Creatures.push(this);
};

Game.CreatureTemplates.Turtle = function(x, y, level) {
    this.id = Game.objectID();
    this.type = "Creature";
    this.name = "Turtle";
    this.symbol = "t";
    this.color = "Green";
    this.isWalkable = false;
    this.move = Game.moveRandomly;
    this.contents = {
        difficulty : 3,
        hp : 30,
        mhp : 30,
        atk : 1,
        def : 6,
        agi : 1,
        exp : 20
    };
    
    this.func = function(actor) {
        Game.fight(actor, this);
    };
    this.x = x;
    this.y = y;
    this.level = level;
    this.move = Game.moveRandomly;
    Game.Objects.push(this);
    Game.Creatures.push(this);
};

Game.CreatureTemplates.LargeRat = function(x, y, level) {
    this.id = Game.objectID();
    this.type = "Creature";
    this.name = "Large Rat";
    this.symbol = "R";
    this.color = "Brown";
    this.isWalkable = false;
    
    this.contents = {
        difficulty : 4,
        hp : 40,
        mhp : 40,
        atk : 6,
        def : 3,
        agi : 2,
        exp : 25
    };
    
    this.func = function(actor) {
        Game.fight(actor, this);
    };
    this.x = x;
    this.y = y;
    this.level = level;
    this.move = Game.moveRandomly;
    Game.Objects.push(this);
    Game.Creatures.push(this);
};

Game.CreatureTemplates.Jester = function(x, y, level) {
    this.id = Game.objectID();
    this.type = "Creature";
    this.name = "Jester";
    this.symbol = "J";
    this.color = "Red";
    this.isWalkable = false;
    
    this.contents = {
        difficulty : 5,
        hp : 60,
        mhp : 60,
        atk : 8,
        def : 5,
        agi : 5,
        exp : 50
    };
    
    this.func = function(actor) {
        Game.fight(actor, this);
    };
    this.x = x;
    this.y = y;
    this.level = level;
    this.move = Game.moveRandomly;
    Game.Objects.push(this);
    Game.Creatures.push(this);
};

Game.CreatureTemplates.MinorDragon = function(x, y, level) {
    this.id = Game.objectID();
    this.type = "Creature";
    this.name = "Small Dragon";
    this.symbol = "d";
    this.color = "Green";
    this.isWalkable = false;
    
    this.contents = {
        difficulty : 6,
        hp : 80,
        mhp : 80,
        atk : 10,
        def : 6,
        agi : 6,
        exp : 70
    };
    
    this.func = function(actor) {
        Game.fight(actor, this);
    };
    this.x = x;
    this.y = y;
    this.level = level;
    this.move = Game.moveRandomly;
    Game.Objects.push(this);
    Game.Creatures.push(this);
};