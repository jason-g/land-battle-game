// temporary testing function added to load
requirejs.config({
    //By default load any module IDs from js/lib
  baseUrl: '.',
  //except, if the module ID starts with "app",
  //load it from the js/app directory. paths
  //config is relative to the baseUrl, and
  //never includes a ".js" extension since
  //the paths config could be for a directory.
  paths: {
    //app: '../app'
    jquery: "third-party/jquery/dist/jquery",
    crafty: "third-party/crafty/crafty"
  },
  urlArgs: "_=" + Math.random()
});

(function() {
  "use strict";
  console.log('foo');

  define(["jquery", "crafty"], 
    function($, Crafty) {
        var testGame = {
            players : [
                {
                    name : "Player 1", 
                    uuid : "1",
                    pieces : [
                        {
                            type : "Major",
                            position_x : 1,
                            position_y : 1
                        },{
                            type : "Colonel",
                            position_x : 10,
                            position_y : 1
                        },{
                            type : "Flag",
                            position_x : 5,
                            position_y : 2
                        }
                    ]
                },{
                    name : "Player 2", 
                    uuid : 2,
                    pieces : [
                        {
                            type : "Major",
                            position_x : 1,
                            position_y : 10
                        },{
                            type : "Colonel",
                            position_x : 10,
                            position_y : 10
                        },{
                            type : "Flag",
                            position_x : 5,
                            position_y : 9
                        }
                    ]
                }
            ],
            game_id : 1
        };
      Game.init(testGame);
      Game.start();
  });

/* 
    main game object
*/

var Game = {
    // Initialize main game vars
    init: function(gameObj) {
        // TBD this should be smarter about creating the game object from param
        Game.players = [];
        $.each(gameObj.players, function() { 
            var player = this;
            Game.add_player(player.name, player.pieces); 
        });
        //Game.players = gameObj ? gameObj.players : [];
        Game.current_player = {};
        Game.game_id  = gameObj ? gameObj.game_id : 0;
        Game.board    = gameObj ? gameObj.board : [];
    },
    
    // inform player it is their turn
    next_turn : function() {
        Game.current_player = Game.players.shift();
        Game.players.push(Game.current_player);
        // TBD: this should be split server/client pub/sub
        Game.current_player.inform('It is your turn '+Game.current_player.name+'.', 3);
    },
    
    // add player
    add_player : function (player_name, pieces) {
        var player_count = Game.players.length;
        // TBD verify number of players
        player_name = player_name ? player_name : player_name = 'Player ' + ++player_count;
        var new_player = Object.create(Player.prototype, {
            uid :  { writable: true,  configurable:true, value: Game.gen_uid() }, 
            name : { writable: true,  configurable:true, value: player_name }
        });
        if (pieces) {
            $.each(pieces, function() {
                var piece = this;
                var new_piece = new_player.add_piece(piece.type, piece.position_x, piece.position_y);
                new_player.pieces.push(new_piece);
            });
        }
        Game.players.push(new_player);
    },
    
    
    // rename player
    rename_player : function (player_id, name) {
         // TBD
        var pid = $.grep(Game.players, function (e) {
            return e.uid == player_id;
        });

        if (pid.length === 0) {
            console && console.log('player not found : '+player_id);
        } else if (pid.length == 1) {
            pid[0].name = name;
        } else {
            console && console.log('multiple players found : '+player_id);
        }
    },
    
    // Initialize and start our game
    start: function() {
        // Start crafty and set a background color so that we can see it's working
        // TBD Do we want to use Crafty with Tiled export or LimeJS maybe
        Crafty.init(800, 600);
        Crafty.background('gray');
        Game.next_turn();
    },
    
    
    
    // Helpers - some of these will eventually be handled on server side
    gen_uid : function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
};

// Player construct
var Player = Object.create(null);
Player.prototype = {
    uid : 0,
    name : "No Name",
    pieces : [],
    add_piece : function (piece_type) {
        // TBD add piece
        this.inform('add piece');
    },
    remove_piece : function (piece_type) {
        // TBD
    },
    inform : function (msg, level) {
        // TBD
        switch (level) {
            case 3:
                alert(msg);
                break;
            default:
                console.log(msg);
                break;
        }
    }
};


// Piece construct
var Piece = Object.create(null);
Piece.prototype = {
    // TBD - use string lang file
    name : 'unnamed warrior',
    rank : 0,       
    desc : 'This warrior kicks butt!',
    movement : {},  // overrides for terrain movement
    moveTo : function (pos_x, pos_y) {
        // TBD move piece
        this.position_x = pos_x;
        this.position_y = pos_y;
        //Game.renderScene();
    },
    highlight : function () {
        // TBD highlight
    },
    ondrag : function () {
        // TBD dragging the piece around
    },
    ondragend : function (e) {
        //TBD drop
        this.moveTo(e.x, e.y);
    }
};


// Piece types
/*
TBD - should players contain info about terrain movements or visa versa
    I am currently thinking to have default definitions in the terrain and 
    any overrides in the specific piece
piece_types = {
	Field_Marshal : {
		name  : "Field Marshal",
		rank  : 9,
		count : 1
	},
	General : {
		name  : "General",
		rank  : 8,
		count : 1
	},
	Major_General : {
		name  : "Major General",
		rank  : 7,
		count : 2
	},
	Brigadier_General : {
		name  : "Brigadier General",
		rank  : 6,
		count : 2
	},
	Colonel : {
		name  : "Colonel",
		rank  : 5,
		count : 2
	},
	Major : {
		name  : "Major",
		rank  : 4,
		count : 2
	},
	Captain : {
		name  : "Captain",
		rank  : 3,
		count : 3
	},
	Lieutenant : {
		name  : "Lieutenant",
		rank  : 2,
		count : 3
	},
	Engineer : {
		name  : "Engineer",
		rank  : 1,
		count : 2,
		desc  : "Engineers are the only pieces which can turn corners when travelling along the Railroad. Engineers can also capture Landmines without being removed from the board"
	},
	Bomb : {
		name  : "Bomb",
		rank  : 0,
		count : 2,
		desc  : "Bombs in contact with any opponent piece, destroy both itself and the piece. They may capture the opponent's flag. Bombs cannot be placed on the front line (the first rank) during the initial set-up."
	},
	Landmine : {
		name  : "Landmine",
		rank  : 0,
		count : 3,
		desc  : "Landmines are immune to any attack, and cause the destruction of attacking pieces (except when attacked by an Engineer or destroyed by a bomb). Depending on the ruleset used, Landmines may or may not be removed from play following a capture. Landmines may only be placed on the fifth and sixth ranks during set-up. The Landmine cannot move from its original position."
	},
	Flag : {
		name  : "Flag",
		rank  : 0,
		count : 1,
		restricted_types : ["Headquarters"],
		desc  : "The Flag must be placed on one of the two Headquarters spaces on the sixth rank. It cannot move. Its capture brings the victory of the attacker and ends the game.[3] Also, when Field Marshal is destroyed, the Flag must be revealed to the opposing player."
	}
};
*/


// Terrain construct


// Terrain types
/*
land_types : {
	Post : {
		name : "Post",
		occupyable : true,
		passable : true,
		cost : 1,
		attackable : true
	},
	Road : {
		name : "Road",
		occupyable : true,
		passable : true,
		cost : 1,
		attackable : true
	},
	Railroad : {
		name : "Railroad",
		occupyable : true,
		passable : true,
		cost : 0,
		attackable : true
	},
	Campsite : {
		name : "Campsite",
		occupyable : true,
		passable : true,
		cost : 1,
		attackable : false
	},
	Mountain : {
		name : "Mountain",
		occupyable : false,
		passable : false,
		cost : 0,
		attackable : false
	},
	Frontline : {
		name : "Frontline",
		occupyable : false,
		passable : true,
		cost : 0,
		attackable : false
	},
	Headquarters : {
		name : "Headquarters",
		occupyable : true,
		passable : true,
		cost : 0,
		attackable : false
	}
}
*/

})();



