/*
 * Create a list that holds all of your cards
 */
 
let allCards = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "anchor", "anchor", "leaf", "leaf", "bicycle", "bicycle"]
var openCards = [];











/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/*
 * Create a list that holds all of your cards
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;   
}


  


var state = "";
// when a card is clicked on
$(".card").click(function(e){
//get the class of the card
var new_state = $(this).children("i").attr(".class");
// If no card is prevosly opened, open card and update state
if(state == "") {
	$(this).addClass("show", "disable");
    state = new_state;   
} 
//If a card is previously opened
else {
  $(this).addClass("show");
  //If the two cards match mark them as being "match"
  if(state == new_state) {
  	$(this).addClass("match");
  }
  //Remove the class "show" from the cards
  $(".card.show").removeClass("show")
  state = "";
  $("h1").text(state);
}
});

openCards.push(this)
if (openCards === 2) {
  if (openCards[0].class === openCards[1].class) {
    matched();
    console.log("matched")
  } else {
    notMatched();
    console.log("not_matched")
  }
};


function matched() {
  openCards [0].addClass("match", "disable");
  openCards [1].addClass("match", "disable");
  openCards [0].removeClass("show");
  openCards [1].removeClass("show");
  openCards = [];
}

function notMatched() {
  openCards [0].addClass("notMatched");
  openCards [1].addClass("notMatched");
  openCards [0].removeClass("show", "notMatched");
  openCards [1].removeClass("show", "notMatched");
  openCards = [];
}
  
  

  
  
  





  /*
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *  - if the list already has another card, check to see if the two cards match
  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
