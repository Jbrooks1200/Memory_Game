// Globals
let openCards = [];
let moves = 0 //Current number of moves the user has made.
let moveCounter = document.querySelector(".moves");
let matches = 0; //Current number of matches the user has made.
let totalMatches = 8; //Total number of possible matches. Used to determine when the game is over.
let allowClick = true; //This helps prevent an accidental double-click while waiting for the no-match timer.
let startTime = new Date(); //Gets the start time of the game.
let deck = document.querySelector(".deck"); //deck of all cards in the game
let minutes = 0
let seconds = 0



//Display the move count on startup for the <span>
$("#moveCount").text(moves);


//Startup timer  that begins the in-game time.
//Assign Variable that you use to pass into the ClearInterval() method.
let timer = setInterval(beginClock, 1000);
let finalTime = timer.innerHTML;

//Created a defined function rather than an anonymous one since we need to call this more than once.
function beginClock()
{   
    let difference = new Date() - startTime;
    
    seconds++;
    if(seconds === 60) {
        seconds = 0;
        minutes++;
    }
    $("#timer").text(pad(minutes, 2) + ":" + pad(seconds, 2));	
}

function stopClock() 
{
  clearInterval(timer); //You have to pass in the VARIABLE assigned to the setInterval() method.
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
}

function shuffleDeck()//Take shuffle function and applies it to the cards and manipulates the DOM with the new cards.
{
  const cardsToShuffle = Array.from(document.querySelectorAll(".deck li"));
  //console.log("cards to shuffle", cardsToShuffle);
  let shuffledCards = shuffle(cardsToShuffle);
  //console.log("shuffled cards", shuffledCards)
  for(card of shuffledCards) {
    deck.appendChild(card);
  }
      
};
  

let state = "";

$(".card").click(function(e) 
{
  if (!allowClick) return; //Prevents double-clicking while the no-match timer waits to reset the cards.
  var new_state = $(this).children("i").attr("class");
      
  $(this).addClass("open");
  $(this).addClass("show");
  $(this).addClass("match");
  $(this).addClass("disable");
      
  state = new_state
  addOpenedCard($(this).children("i")); //Passes in the current <li> that was clicked to the addOpenedCard function
});  

function addOpenedCard(myCard) 
{
	  openCards.push(myCard);
	  let len = openCards.length;

	  if (len > 1) //See if the user has opened the second card
	  {
			//Update the number of moves the user has made.
      moves++;
      starRating();
			$("#moveCount").text(moves); //Updates the screne with the number of moves
		  
			//Must user the array index followed by the <li> index to get the class name
			if (openCards[0][0].className === openCards[1][0].className) 
			{
			  matched();
			} 
			else 
			{
			  //The timer has finished and the no-match cards have been reset so allow the user to click again.
			  allowClick = false;
			  notMatched();
			}
	  }
};

function matched() {
	
	//Just a loop to update both indexes
	for (var i = 0; i <= 1; i++)
	  {
		  openCards[i].addClass("match");
		  openCards[i].addClass("disable");
		  openCards[i].removeClass("show");
	  }
	  matches++;
	  openCards = [];
	  if (matches == totalMatches)
	  {
           //Game Over! Set your stats here
           modalStats();    
          }  
 };

function notMatched() {
  openCards[0].parent().addClass("unmatched");
  openCards[1].parent().addClass("unmatched");
  openCards[0].parent().removeClass("disable");
  openCards[1].parent().removeClass("disable");
  
  setTimeout(function() {
	  //This is the timer that shows the no-match cards for 1/2 second to give visual feedback and then resets them back to their original state.
	  for (var i = 0; i <= 1; i++)
	  {
		openCards[i].parent().removeClass("open");
		openCards[i].parent().removeClass("show");
		openCards[i].parent().removeClass("match");
		openCards[i].parent().removeClass("unmatched");
		allowClick = true;
	  }
    openCards = [];
	  
  }, 500);
  
};

//Removes stars based on the number of moves.
function starRating () {
  if (moves == 12 || moves == 20) {
    removeStar();
  }
};

function removeStar() {
  let starCount = document.querySelectorAll(".stars li");
  for(var star of starCount) {
    if(star.style.display !== "none") {
      star.style.display = "none";
      break;
    }
  }
};
  
 
//Helper Function to pad the minutes and seconds with a leading zero
function pad(num, size) {
	let s = num + "";
	while (s.length < size) s = "0" + s;
	return s;
};
 
function modalStats() {
 
    if (totalMatches = 8){
      clearInterval(timer);
      stopClock();
      finalTime = timer.innerHTML;

      // show congratulations modal
      $("#popup1").show();
      $(".overlay").show();

      // declare star rating variable
      let stars = document.querySelector(".stars").innerHTML;
      

      //showing move, rating, time on modal
      document.querySelector("#finalMove").innerHTML = moves; 
      document.querySelector("#totalMinutes").innerHTML = minutes;
      document.querySelector("#totalSeconds").innerHTML = seconds;
      document.querySelector("#stars").innerHTML = stars; 
  };
}




function startGame() {
  clearInterval(timer);
  resetClock();
  shuffleDeck();
  removeClasses();
  resetMoves();
  resetStars();
  openCards = [];
  $("#popup1").hide();
  timer = setInterval(beginClock, 1000);
}

function resetClock() {
//reseting timer
startTime = new Date();
seconds = 0;
minutes = 0;
$("#timer").text("00:00");
}

function resetMoves() {
  moves = 0
  moveCounter.innerHTML = moves
}

function resetStars() {

  let starCount = document.querySelectorAll(".stars li");

  for(var star of starCount) {
      star.style.display = "inline-block";
  }
}

function removeClasses() {
  let cards = document.querySelectorAll(".card i")
  for (var i = 0; i < cards.length; i++) {
    $(".card").removeClass("open")
    $(".card").removeClass("show")
    $(".card").removeClass("match");	
  } 
}

function anotherRound() {
  $("#popup1").hide();
  startGame();
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
