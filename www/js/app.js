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
    jquery: "./js/lib/jquery/dist/jquery",
    crafty: "./js/lib/crafty/crafty"
  },
  urlArgs: "_=" + Math.random()
});

(function() {
  "use strict";

  define(["jquery", "js/game"], 
    function($, Game) {
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



