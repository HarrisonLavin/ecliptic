var environment = require(./environment.js);
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
