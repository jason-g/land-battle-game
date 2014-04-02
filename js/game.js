/* 
    main game object
*/
 define(["jquery", "crafty", "js/player", "js/piece"], 
  function($, Crafty, Player, Piece) {
    
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
  return Game;
});
