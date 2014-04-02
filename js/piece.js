
define(["jquery"], 
function($) {
  var Piece = {};
  return Piece.prototype = {
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
  return Piece;
});