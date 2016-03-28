var environment = require(./environment.js);
module.exports = {
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

}