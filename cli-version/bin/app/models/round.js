
var environment = require(./environment.js);

module.exports= {
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
    currentGame.players[player].points++;
    for(var i in currentGame.players){
      if(currentGame.players[i].points == currentGame.goal){
        currentGame.over(currentGame.players[i]);
      }
    }
    nextRound = new Round(Game.players);
  };

}