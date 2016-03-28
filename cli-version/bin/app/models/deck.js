var environment = require(./environment.js);

module.exports= {

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
}