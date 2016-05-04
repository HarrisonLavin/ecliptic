//VARIABLES

//tracks current deck
var currentDeck=[];

//tracks opponent's hand
var oppHand=[];

//tracks number of cards in player's hand
var playerHand= [];

//tracks opp's score
var oppScore=0;

//tracks player's score
var playerScore=0;

//tracks number of cards left in deck
var deckSize = currentDeck.length;


//FUNCTIONS

//Shuffles the Deck
function shuffleDeck(){
  $('td.playerHand').empty();
  $('td.opponentHand').empty();
  var toSwap; // The index we will swap  (i.e. the random number)
  var temp; // A temporary variable to hold reference to index variable i points to
  for (i = DECK.length - 1; i > 0; i--) { 
      toSwap = Math.floor(Math.random() * i);
      temp = DECK[i];
      DECK[i] = DECK[toSwap];
      DECK[toSwap] = temp;
  }
  currentDeck = DECK.slice(0, 13)
  oppHand.push(currentDeck.pop())
  drawCard()
  drawCard()

  $('tr #you').animate({
    color: "black",
    backgroundColor: "white"
  })
  $('tr #opp').animate({
    color: "white",
    backgroundColor: "black"
  })

  $('td.opponentHand').append('<img src="./imgs/0.png">')
  $('#deckLeft').text(currentDeck.length) 

}

//Playing a card (drag and drop?)
function playCard(id){

  var indexInHand= playerHand.indexOf(id)
  playerHand.splice(indexInHand, 1);

  CARDS[id]();

  $('tr #you').animate({
    color: "white",
    backgroundColor: "black"
  })
  $('tr #opp').animate({
    color: "black",
    backgroundColor: "white"
  })
  oppDrawCard()
}

//Drawing a card
function drawCard(){
    if(currentDeck.length >0){
      if(playerHand.length < 2){
        card_to_draw = currentDeck.pop()
        $('.playerHand').append('<img class="card" src="./imgs/'+card_to_draw+'.png">')
        playerHand.push(card_to_draw)
        $('.playerHand img.card').draggable({
          containment: $('table'),
          stack: $('img.card'),
          snap: "#playfield",
          start: startDragging
        });
        $('#deckLeft').text(currentDeck.length) 
      }
    }else{
      tiebreaker();
    }
  }

   

//Computer draws a card
function oppDrawCard(){
  if(currentDeck.length > 0){
    oppHand.push(currentDeck.pop())
    oppPlayCard();
  } else{
    tiebreaker();
  }
}

//Computer plays card
function oppPlayCard(){
  if(oppHand[0] === 8){
    $('.opponentDiscard').append('<img src="./imgs/'+oppHand[1]+'.png">')
    OPPCARDS[oppHand[1]]()
    oppHand.splice(1,1)
  } else{
    OPPCARDS[oppHand[0]]()
    $('.opponentDiscard').append('<img src="./imgs/'+oppHand[0]+'.png">')
    oppHand.splice(0,1)
  }
  drawCard();
  $('tr #you').animate({
    color: "black",
    backgroundColor: "white"
  })
  $('tr #opp').animate({
    color: "white",
    backgroundColor: "black"
  })
 

}
//tiebreaker!  For when you've run out of cards
function tiebreaker(){

  if(playerHand[0] > oppHand[0]){
    roundWinner("you")
  } else{
    roundWinner("opp")
  }
}

//UI stuff for drag-and-drop
function startDragging(ui){

  idWithinHand = this.parentElement.id
  idWithinDeck = this.src.slice(-5,-4)
  draggable = this.cloneNode()
  
  $('#playfield').css("visibility", "visible")
 
}

function handleDropEvent( event, ui ) {

  var draggable = ui.draggable;
  $('#playfield').css("visibility", "hidden")
  playCard(idWithinDeck)
  ui.draggable.remove()
  $('.playerDiscard').append('<img src="./imgs/'+idWithinDeck+'.png">')
}


//each individual card's effects

var DRONE = function(){
  var response = prompt("Enter the value of the card you'd like to guess (2-8)");
  if (oppHand[0] === parseInt(response)){
    alert("Your guess of " +response +" was correct!  You win this round.")
    roundWinner("you")
  }
}

var oppDRONE = function(){
  alert("The computer is playing a :DRONE")
  var choice= Math.floor(Math.random() * 7) + 2
  alert("The computer chose "+ choice)
  if (playerHand[0]=== choice){
    alert("The computer's guess of "+choice+"was correct!  They win this round.")
    finishRound("opp")
  }
}

var FIELD_TECH= function(){
  alert(oppHand[0])
}

var oppFIELD_TECH= function(){
  alert("The computer has used a FIELD_TECH to look at your hand!")
}

var STRIKER= function(){
  alert("They had a "+ oppHand[0]+"value card!")
  if(oppHand[0] < playerHand[0]){
    roundWinner("you")
  } else {
    roundWinner("opp")
  }
}

var oppSTRIKER= function(){
  alert("They used a striker!")
  STRIKER();
}

var REPLICANT = function(){
  alert("ok, this is still a work in progress")
}

var oppREPLICANT= function(){
  alert("ok, this is still a work in progress")
}

var CHAIRMAN = function(){
  alert("ok, this is still a work in progress")
}

var oppCHAIRMAN= function(){

  alert("ok, this is still a work in progress")
}

var CMNDR = function(){
  alert("ok, this is still a work in progress")
}

var oppCMNDR= function(){
  alert("ok, this is still a work in progress")
}

var OPERATIVE = function(){
  alert("ok, this is still a work in progress")
}

var oppOPERATIVE = function(){
  alert("ok, this is still a work in progress")
}

var ECLIPTECH = function(){
  roundWinner("opp")
}

var oppECLIPTECH = function(){
  roundWinner("you")
}

//award points
function roundWinner(winner){
  oppHand=[];
  playerHand=[];
  if(winner === "you"){
    playerScore++
    $('span#playerScore').text(playerScore)
  } else{
    oppScore++
    $('span#opponentScore').text(oppScore)
  }

  if(playerScore === 7){
    endGame("You ")
  }else if (oppScore=== 7){
    endGame("The Computer ")
  } else {
    shuffleDeck();
  }
}


//ends game if either player reaches 7 points
function endGame(winner){
  $('body').text(winner + " won!").css("color", "white")
}

//CONSTANTS

var DECK= [1,1,1,1,1,2,2,3,3,4,4,5,5,6,7,8]

var CARDS= {
  1: DRONE, 
  2: FIELD_TECH,
  3: STRIKER,
  4: REPLICANT,
  5: CHAIRMAN,
  6: CMNDR,
  7: OPERATIVE,
  8: ECLIPTECH
}

var OPPCARDS={
  1: oppDRONE, 
  2: oppFIELD_TECH,
  3: oppSTRIKER,
  4: oppREPLICANT,
  5: oppCHAIRMAN,
  6: oppCMNDR,
  7: oppOPERATIVE,
  8: oppECLIPTECH
}