Land Battle Chess
=================

This is the initial checkin of POC for land battle chess

Summary
-------
This game will be a multiplayer turn based version of the Chinese Land Battle Chess
Client side will use HTML5 and Crafty.js
Server side will use Node.js

Examples
--------
after loading the page in browser use console:

console.dir(require('js/game'));

var Game = require('js/game');

Game.players

Game.players[1]
{
  name: "Player 2"
  uid: "46060add-0161-4e8b-9792-a23fc100b9dc"
}


Game.rename_player("46060add-0161-4e8b-9792-a23fc100b9dc", 'New Player 2');

Game.players[1].name
"New Player 2"

Game.next_turn();
