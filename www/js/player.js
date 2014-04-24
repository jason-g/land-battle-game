
define(["jquery"], 
function($) {
  var Player = {};
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
  return Player;
});
