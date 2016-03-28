var environment = require(./environment.js);
module.exports = {
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
}