/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let moves = 0;
let correctCards =0;
let openedCards = [];
let card1, card2;
let card1Parent = '';
let card2Parent = '';

// timer source code https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
let timerVar = setInterval(countTimer, 1000);
let totalSeconds = 0;
init();
confirm(" play again ? ");
function countTimer() {
	++totalSeconds;
	let hour = Math.floor(totalSeconds / 3600);
	let minute = Math.floor((totalSeconds - hour * 3600) / 60);
	let seconds = totalSeconds - (hour * 3600 + minute * 60);
	function pad(val) {
		return val > 9 ? val : "0" + val;
	}
	document.getElementById("seconds").innerHTML = pad(seconds);
	document.getElementById("minutes").innerHTML = pad(minute);
	document.getElementById("hours").innerHTML = pad(hour);
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function init() {
	let cards = [];
	let ulList = document.getElementsByClassName('deck')[0];
	let elements = document.getElementsByClassName('card');
	for (let i = 0; i < elements.length; i++) {
		cards.push(elements[i])
	}
	cards = shuffle(cards);
	let i = 0;
	for (let value of cards) {
		var elment = document.createElement("li");
		elment.style.listStyleType = "none";
		value.className = "card";
		elment.appendChild(value);
		ulList.replaceChild(elment, ulList.childNodes[i]);
		ulList.childNodes[i].addEventListener("click", function(event) {
			cardclicked(value);
		});
		i++;
	}
}

function updatemoves() {
	moves++;
	document.getElementsByClassName("moves")[0].innerHTML = moves;
	if (moves > 5) {
		document.getElementsByClassName("fa-star")[0].style.display = "none";
	}
	if (moves > 10) {
		document.getElementsByClassName("fa-star")[1].style.display = "none";
	}
	if (moves > 20) {
		document.getElementsByClassName("fa-star")[2].style.display = "none";
	}
}

function reset() {
	//clear timer
	sec = 0;
	document.getElementById("seconds").innerHTML = "";
	document.getElementById("minutes").innerHTML = "";
	//clear moves and stars
	moves = 0;
	document.getElementsByClassName("moves")[0].innerHTML = moves;
	document.getElementsByClassName("fa-star")[0].style.display = "";
	document.getElementsByClassName("fa-star")[1].style.display = "";
	document.getElementsByClassName("fa-star")[2].style.display = "";
	init();
}

function cardclicked(card) {
	let className = card.getAttribute('class');
	if (className != "card match") {
		
		updatemoves();
		switch (openedCards.length) {
			case 0:
				// code block
				if (className != "card open show" && className != "card match") {
					openedCards.push(card);
					card.className = 'card open show';
				}
			break;
			case 1:
				// check if clicked card is the same card
				if(card != openedCards[0]){
				openedCards.push(card);
				card.className = 'card open show';
				card1 = openedCards[0].children[0].className;
				card2 = openedCards[1].children[0].className;
				if (card1 == card2) {
					openedCards[0].className = "card match";
					openedCards[1].className = "card match";
					openedCards = [];
					correctCards+=2;
					checkWin();
				} else {
					card1Parent = openedCards[0];
					card2Parent = openedCards[1];
					card1Parent.className = "card fail";
					card2Parent.className = "card fail";
					setTimeout(function() {
						card1Parent.className = "card";
						card2Parent.className = "card";
					}, 1300);
					openedCards = [];
				}
				}
			break;
		}
	}
}
function checkWin(){
 console.log(correctCards);
if(correctCards==16){

	console.log("win");
	
	if (confirm(" play again ? ")) {
    console.log("play again");
  } else {
   
  }
}
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