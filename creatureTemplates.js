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
    this.move = function() {
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
    this.move = function() {
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
    this.move = function() {
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
    Game.Objects.push(this);
    Game.Creatures.push(this);
};