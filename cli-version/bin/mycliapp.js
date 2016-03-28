#! /usr/bin/env node

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

// //Instantiates initial deck
// var DECK = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
// var CARDS = [null, "GUARD", "TECH", "FIXER", "ASSISTANT", "CHAIRMAN", "DIRECTOR", "OPERATIVE", "ECLIPTIC"];
// var P1Hand = [];
// var P2Hand = [];
// var P3Hand = [];
// var P4Hand = [];
// var PLAYERS = [];
// var maxPlayers = numPlayers.toString();

// //sets up PLAYER array
// switch(maxPlayers){
//   case "2":
//     PLAYERS= [P1Hand, P2Hand]
//     console.log(PLAYERS)
//     break;
//   case "3":
//     PLAYERS= [P1Hand, P2Hand, P3Hand]
//     console.log(PLAYERS)
//     break;
//   case "4":
//     PLAYERS= [P1Hand, P2Hand, P3Hand, P4Hand]
//     console.log(PLAYERS)
//     break;
//   default:
//     console.log("PLAYERS is empty")
//     break;
//   }
// //Shuffles Deck


// function dealCardTo(playerHand){
//   playerHand.push(thisRoundDeck.pop());
// }

// //Starts first round
// console.log("Discarding the top card of the deck...")
// var thisRoundDeck = DECK.slice(0, 16);
// console.log("Dealing a card out to each player..")
// dealCardTo(P1Hand)
// console.log("P1Hand is" + P1Hand);
// dealCardTo(P2Hand)
// console.log("P2Hand is" + P2Hand);

// console.log("Dealing Player 1 a card.")
// dealCardTo(P1Hand)
// // gameLoop(0);
// function gameLoop(player){
//   //Deals current player a card
//   //Player's action
//   read.question("Player " + (player + 1) + ": What action would you like to take?([H]AND, [P]LAY, [Q]UIT) ", function (answer){
//     read.pause();
//     switch(answer){
//       case "H":
//         console.log("You have a " + CARDS[PLAYERS[player][0]] + " and a " + CARDS[PLAYERS[player][1]]);
//         gameLoop(player);
//         break;
//       case "P":
//         read.question("Which card would you like to play?(Card [O]NE or Card [T]WO) ", function (answer){
//           read.pause();
//           if((answer === "O") || (answer === "T")){
//             play(player, answer);
//           } else{
//             console.log("NOT A VALID CARD");
//             gameLoop(player);
//           }
//           var newPlayer = (player + 1) % numPlayers;
//           console.log("Dealing Player" + ((newPlayer + 1) % numPlayers) + " a card.")
//           dealCardTo(PLAYERS[newPlayer]);
//           turnSwap();
//           gameLoop(newPlayer);
//         })
//         break;
//       case "Q":
//         break;
//       default:
//         console.log("NOT A VALID COMMAND")
//         gameLoop(player);
//     }
//     });
// }

// function turnSwap(){
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
//   console.log("``````````````````````")
  
// }

// function play(player, card){
//   if(card === "O"){
//     PLAYERS[player].splice(0,1);
//   } else{
//     PLAYERS[player].splice(1,1);
//   }
// } 
// read.question("What action would you like to take? ([C]ARDS, [P]LAY)", function actionPrompt(answer) {
//     read.close(); // close the instance of reading interface
//     while(answer != "exit"){
//       console.log("You have a " + CARDS[P1Hand[0]] + " and a " + CARDS[P1Hand[1]]);
//     }
    
//   })


// Game Class

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


//Player Class
function Player(num){
  this.num = num;
  this.hand = [];
  this.points = 0;
  this.assisted= false;
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

//Round Class
function Round(players){
  if(players.length == 2){
    this.pubDiscard = [];
    this.pubDiscard.push(this.deck.splice(0, 3));
  }
  this.deck= shuffledDeck.slice(0, 16)
  this.playersPresent = currentGame.players;
  for (var i in currentGame.players){
    currentGame.players[i].drawCard();
  }
}

Round.prototype.over = function(player) {
  console.log("The round is over, Player "+ player + " has won ECLIPTIC's favor." )
  Game.players[player].points++;
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


//var target = Game.players[player]
//CARD CLASS STUFF
//All targets args in these functions are player objects

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

Game.prototype.loop = function() {
  var action = "";
  var playerIndex= 0;
  var currentPlayer = currentGame.players[playerIndex];
  read.question("Player " + (playerIndex + 1) + ": What action would you like to take?([H]AND, [P]LAY) ", function (answer){
  read.pause();
    switch(answer){
      case "H":
        currentPlayer.cardDisplay();
        currentGame.loop();
        break;
      case "P":
        currentPlayer.playCard();
        break;
      default:
        console.log("NOT A VALID CHOICE");
        break;
      }
    })
  }
 // read.question("Player " + (player + 1) + ": What action would you like to take?([H]AND, [P]LAY, [Q]UIT) ", function (answer){
 //  read.pause();
 //  switch(answer){
 //    case "HAND"
 //      player.cardDisplay();
 //      break;
 //    case 


//AND NOW THE GAME ACTUALLY RUNS 
currentGame= new Game(numPlayers);
currentRound= new Round(currentGame.players)
console.log("The game has started")
//300 LINES AND COUNTING, JESUS LORD ALMIGHTY.
currentGame.loop();