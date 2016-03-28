#! /usr/bin/env node

var environment = require('environment.js');

//Takes in arguments for game start
var args = process.argv;
args.splice(0,2);

//Take in number of players
var numPlayers = args[0];
console.log(numPlayers + " players are playing.")


//establishes reading interface
var rl = require('readline');

var read = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});


//AND NOW THE GAME ACTUALLY RUNS 
currentGame= new GAME.Game(numPlayers);
currentRound= new ROUND.Round(currentGame.players)
console.log("The game has started")
currentGame.loop();