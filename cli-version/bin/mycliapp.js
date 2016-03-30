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
  var currentPlayer = currentGame.players[currentRound.currentPlayer];
  
  if(!currentPlayer.turnStarted){
    currentPlayer.drawCard();
  }
  currentPlayer.turnStarted = true;
  read.question("Player " + (currentPlayer.num + 1) + ": What action would you like to take?([H]AND, [P]LAY, CARD [E]XPLANATION) ", function (answer){
  read.pause();
    switch(answer){
      case "H":
        currentPlayer.cardDisplay();
        currentGame.loop();
        break;
      case "P":
        currentPlayer.turnStarted = false;
        currentRound.currentPlayer= (currentRound.currentPlayer + 1) % numPlayers;
        currentPlayer.playCard();
        break;
      case "E":
        cardExplanation();
        currentGame.loop();
        break;
      default:
        console.log("NOT A VALID CHOICE");
        break;
      }
    })
  }

  //Player Class
  function Player(num){
    this.num = num;
    this.hand = [];
    this.points = 0;
    this.assisted= false;
    this.turnStarted = false;
  }

  Player.prototype.drawCard = function() {
    // if(this.hand.length && shuffledDeck.length && ((shuffledDeck[-1].name ===  ":OPERATIVE") && (this.hand[0].name === ":CMNDR")) || ((shuffledDeck[-1].name ===  ":OPERATIVE") && (this.hand[0].name === ":CHAIRMAN"))) {
    //   this.hand.shift(shuffledDeck[-1]);
    // }
    
    //Should the deck store nubmers, and then cards are first created when drawn?  In that cast, Operative's code could check immediately to see if the other card in your hand is CMNDR or CHAIRMAN.  Also, cards need value numbers.
    newCardValue= shuffledDeck.pop();
    //finds proper card hash from the CARDDATA hash
    //Checks to see if operative, forces player to play 
    this.hand.push()
  };

  Player.prototype.cardDisplay = function(){
    for (var card in this.hand){
      console.log(this.hand[card].name)
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
    var that = this
    //Check all cards for OPERATIVE here? Force player to play Operative and notify them?
    read.question("Which card would you like to play: [0]"+ this.hand[0].name + " or [1]"+ this.hand[1].name +"? ", function (answer){
        read.pause();
        // console.log('\033[2J');
        console.log("Player"+ (that.num + 1) + " played " + that.hand[parseInt(answer)].name + ".");
        that.hand.splice(parseInt(answer),1);
        currentGame.loop();
      })
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
    this.currentPlayer= 0;
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



function Card(callback, name, value){
  this.name = name;
  this.effect = callback;
  this.value = value;
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
    return "goes nowhere, does nothing";
  };

var ECLIPTIC= function (caller){
  caller.isOut();
}

function cardExplanation(){
  console.log(":DRONE- Choose an opponent and guess a non-:DRONE card.  If that opponent has that card, they are out of the round. Has no effect if they are protected by a :REPLICANT.");
  console.log(":FIELD_TECH- Choose an opponent.  You may look at their hand, if they are not protected by a :REPLICANT.")
  console.log(":STRIKER- Compare hands with another player.  Whoever has the lower value card is out of the round.  Cannot be played against a player protected by a :REPLICANT.")
  console.log(":REPLICANT- Until the start of your next turn, you ignore the effects of any card played against you.")
  console.log(":CHAIRMAN- Choose a player, including yourself.  That player discards their hand, and draws a new one.  If all other players are protected by a :REPLICANT, you must play this card on yourself and abide by its effects.")
  console.log(":CMNDR- Exchange hands with another player.  May not be played on a player protected by a :REPLICANT.")
  console.log(":OPERATIVE- Must be discarded if you have a :CMNDR or :CHAIRMAN in hand.  May be discarded at any other time to no effect otherwise.")
  console.log(":ECLIPTECH- If you discard this card, you are out of the round.")
}
//deck class
var DECK = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
var CARDDATA = {":DRONE":{effect: GUARD, value: 1}, ":FIELD_TECH":{effect: TECH, value: 2}, ":STRIKER":{effect: FIXER, value: 3}, ":REPLICANT":{effect: ASSISTANT, value: 4}, ":CHAIRMAN":{effect: CHAIRMAN, value: 5}, ":CMNDR":{effect: DIRECTOR, value: 6}, ":OPERATIVE"{effect: OPERATIVE, value: 7}, ":ECLIPTECH":{effect: ECLIPTIC, value: 8}};


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

currentGame= new Game(numPlayers);
currentRound= new Round(currentGame.players)
console.log("The game has started")
currentGame.loop();