"use strict";
let moves = 0;
let stars = 3;
let correctCards = 0;
let openedCards = [];
let card1, card2;
let card1Parent = '';
let card2Parent = '';
let totalSeconds = 0;
let hour = 0;
let minute = 0;
let seconds = 0;
let clikToStart = true;
let timerVar;
// timer source code https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript

init();

function countTimer() {
	++totalSeconds;
	hour = Math.floor(totalSeconds / 3600);
	minute = Math.floor((totalSeconds - hour * 3600) / 60);
	seconds = totalSeconds - (hour * 3600 + minute * 60);

	document.getElementById("seconds").innerHTML = pad(seconds);
	document.getElementById("minutes").innerHTML = pad(minute);
	document.getElementById("hours").innerHTML = pad(hour);
}

function pad(val) {
    return val > 9 ? val : "0" + val;
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
	document.getElementsByClassName("moves")[0].innerHTML = moves;
	let cards = [];
	let ulList = document.getElementsByClassName('deck')[0];
	let elements = document.getElementsByClassName('card');
	for (let i = 0; i < elements.length; i++) {
        cards.push(elements[i]);
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
	if (moves > 15) {
		document.getElementsByClassName("fa-star")[0].style.display = "none";
		stars = 2;
	}
	if (moves > 35) {
		document.getElementsByClassName("fa-star")[1].style.display = "none";
		stars = 1;
	}
	if (moves > 50) {
		document.getElementsByClassName("fa-star")[2].style.display = "none";
		stars = 0;
	}
}

function reset() {
    //clear firstClick to starting the timer when the first card is flipped.
    clikToStart = true;
	//clear timer
	totalSeconds = 0;
	clearInterval(timerVar);
	document.getElementById("seconds").innerHTML = '00';
	document.getElementById("minutes").innerHTML = '00';
	document.getElementById("hours").innerHTML = '00';
	//clear moves and stars
	stars = 3;
	moves = 0;
	document.getElementsByClassName("fa-star")[0].style.display = "";
	document.getElementsByClassName("fa-star")[1].style.display = "";
    document.getElementsByClassName("fa-star")[2].style.display = "";
    openedCards = [];
	correctCards = 0;
    init();
}

function cardclicked(card) {

    if (clikToStart) {
        timerVar = setInterval(countTimer, 1000);
        clikToStart = false;
    }

	let className = card.getAttribute('class');
    if (className != "card match") {
		
		switch (openedCards.length) {
			case 0:
				// code block
                if (className != "card open show" && className != "card match") {
					openedCards.push(card);
                    card.className = 'card open show';
                    updatemoves();
				}
				break;
			case 1:
				// check if clicked card is the same card
				if (card != openedCards[0]) {
					openedCards.push(card);
                    card.className = 'card open show';
                    updatemoves();
					card1 = openedCards[0].children[0].className;
					card2 = openedCards[1].children[0].className;
					if (card1 == card2) {
						openedCards[0].className = "card match";
						openedCards[1].className = "card match";
						openedCards = [];
						correctCards += 2;
						checkWin();
					} else {
						card1Parent = openedCards[0];
						card2Parent = openedCards[1];
						card1Parent.className = "card fail";
						card2Parent.className = "card fail";
						setTimeout(function() {
							card1Parent.className = "card";
							card2Parent.className = "card";
						}, 500);
						openedCards = [];
					}
				}
				break;
		}
	}
}

function checkWin() {
	if (correctCards == 16) {
		// Get the modal
		let popup = document.getElementsByClassName('popup')[0];
		popup.style.display = "block";
		let result = document.getElementsByClassName('result')[0];
		let message = `with ${moves} moves AND ${stars} Stars.

		in ${hour}:${minute}:${seconds}`;
		result.innerHTML = message;
		clearInterval(timerVar);
	}
}

function playAgain() {
	reset();
	let popup = document.getElementsByClassName('popup')[0];
	popup.style.display = "none";
}