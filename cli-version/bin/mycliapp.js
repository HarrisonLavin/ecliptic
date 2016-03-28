#! /usr/bin/env node

//Takes in arguments for game start
var args = process.argv;
args.splice(0,2);

//Take in number of players
var numPlayers = args[0];
console.log(numPlayers + " players are playing.")


//require('require-all')(__dirname + '/app')

//establishes reading interface
var rl = require('readline');

var read = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});


//AND NOW THE GAME ACTUALLY RUNS 



function Game(playerNum){
  var i = 0;
  this.players= [];

  while(i < playerNum){
    this.players[i]= new Player(i);
    i++;
  }

  if(playerNum == 4){
    this.goal = 4;
  }else if (playerNum == 3){
    this.goal = 5;
  } else {
    this.goal = 7;
  }

  console.log("This game's goal is:"+ this.goal);
}

Game.prototype.over= function (winner){
  console.log("The game is over, " + winner + "is the winner")
}


Game.prototype.loop = function() {
  var action = "";
  var playerIndex= 0;
  var currentPlayer = currentGame.players[playerIndex];
  
  if(!currentPlayer.turnStarted){
    currentPlayer.drawCard();
  }
  currentPlayer.turnStarted = true;
  read.question("Player " + (playerIndex + 1) + ": What action would you like to take?([H]AND, [P]LAY) ", function (answer){
  read.pause();
    switch(answer){
      case "H":
        currentPlayer.cardDisplay();
        currentGame.loop();
        break;
      case "P":
        currentPlayer.turnStarted = false;
        playerIndex++;
        currentPlayer.playCard();
        break;
      default:
        console.log("NOT A VALID CHOICE");
        break;
      }
    })
  }
  function Player(num){
    this.num = num;
    this.hand = [];
    this.points = 0;
    this.assisted= false;
    this.turnStarted = false;
  }

  Player.prototype.drawCard = function() {
    this.hand.push(shuffledDeck.pop())
  };

  Player.prototype.cardDisplay = function(){
    for (var card in this.hand){
      console.log(this.hand[card].title)
    }
  }

  Player.prototype.isOut = function() {
    Round.playersPresent.splice(this.num, 1);
    if(Round.playersPresent.length()== 1){
      Round.over(Round.playersPresent[0]);
    } else{
      Game.loop();
    }
  };

  Player.prototype.playCard= function (){
    Round.playersPresent;
  }
  
   function Round(players){
    this.deck= shuffledDeck.slice(0, 16)
    if(players.length == 2){
      this.pubDiscard = [];
      this.pubDiscard.push(this.deck.pop(3));
    }
    this.playersPresent = currentGame.players;
    for (var i in currentGame.players){
      currentGame.players[i].drawCard();
    }
  }

  Round.prototype.over = function(player) {
    console.log("The round is over, Player "+ player + " has won ECLIPTIC's favor." )
    currentGame.players[player].points++;
    for(var i in currentGame.players){
      if(currentGame.players[i].points == currentGame.goal){
        currentGame.over(currentGame.players[i]);
      }
    }
    nextRound = new Round(Game.players);
  };


//Deck Class
var DECK = [new Card("GUARD"), new Card("GUARD"), new Card("GUARD"), new Card("GUARD"), new Card("GUARD"), new Card("TECH"), new Card("TECH"), new Card("FIXER"), new Card("FIXER"), new Card("ASSISTANT"), new Card("ASSISTANT"), new Card("CHAIRMAN"), new Card("CHAIRMAN"), new Card("DIRECTOR"), new Card("OPERATIVE"), new Card("ECLIPTIC")];

var shuffledDeck = function (){
  var dLength = DECK.length - 1;
  var toSwap;
  var temp;
  for(i= dLength; i > 0; i--){ 
    toSwap = Math.floor(Math.random() * i);
    temp = DECK[i];
    DECK[i] = DECK[toSwap];
    DECK[toSwap] = temp;
  }
  return DECK;
}();

function Card(title){
  this.title = title;
}

var GUARD = function (target, guess){
  if(!(target.assisted) && (target.hand[0] === guess)){
      target.isOut();
    } 
  }

var TECH = function (target){
  if(!(target.assisted)){
    target.cardDisplay();
  }
}

var FIXER= function (caller, target){
  if(!(target.assisted)){
    if(caller.hand[0] > target.hand[0]){
      target.isOut();
    } else{
     caller.isOut();
   }
 }
}

var ASSISTANT= function (caller){
  caller.assisted = true;
}

var CHAIRMAN= function (target){
  if(!(target.assisted) && (target.hand[0] != ECLIPTIC)){
    target.hand[0].discard();
  } else if(target.hand[0] == ECLIPTIC){
    target.isOut();
  }
}

var DIRECTOR= function (caller, target){
  temp = caller.hand;
  caller.hand = target.hand;
  target.hand = temp;
}

var OPERATIVE= function()
  {
    console.log("goes nowhere, does nothing")
  };

var ECLIPTIC= function (caller){
  caller.isOut();
}

currentGame= new Game(numPlayers);
currentRound= new Round(currentGame.players)
console.log("The game has started")
currentGame.loop();