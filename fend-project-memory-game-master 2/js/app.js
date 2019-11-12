

 // decalre a variable to store all cards
let card = document.getElementsByClassName('card');
let cards = [...card];

// declare a varibles to be used to store time
let timeInterval;
let totalTime =0;
let timer = document.getElementById('timerCount');

//declare a variable to store moves count
let moves = 0;

// store the cards deck to fill in cards after shuffle
const cardsDeck = document.querySelector(".deck");

//declare a variable to store stars
const starsList = document.querySelectorAll(".fa-star");

//store the opened cards in a varibale
let openedCardCount =0;
let openedCards =[];

//store the matched cards in a array
let matchedCards =[];

// create variables for the clickable elements to add event listeners to it
let restart = document.getElementById('restartBtn');
let playAgain = document.getElementById('playAgainBtn');
let closeModal = document.getElementById('congratsModal');

// event listner on click on play again in congrats modal
playAgain.addEventListener('click',function(){
  closeModalFun();
  restartGame(cards);
});

// on click restart game listener
restart.addEventListener('click',function(){
  restartGame(cards);
});

// to close congrats modal on click on close
closeModal.addEventListener('click',function(){
  closeModalFun();
  restartGame(cards);
});

//restart game function -- resetting moves and timer and shuffle the cards
function restartGame(pCards){
openedCards =[];
stopTimer();
matchedCards=[];
moves=0;

for (var i = 0; i < 3 ; i++){
  starsList[i].classList.remove('transparentStar');
}
document.getElementById('movesCount').innerHTML = moves;
let shuffledCards = shuffle(pCards);
cardsDeck.innerHTML = "";
for (const shuffledCard of shuffledCards) {
  const oneCard = document.createElement("li");
  oneCard.innerHTML = shuffledCard.innerHTML;
  oneCard.classList = "card";
  cardsDeck.appendChild(oneCard);

  //event listener on card click after shuffle
  oneCard.addEventListener('click', function(event) {

    //if it's the first click, start the timer
    if (moves == 0) {
      stopTimer();
      timeInterval = setInterval(function(){
           timer.innerHTML = totalTime;
            totalTime++;
          },1000);
    }

    // call opencards function
    openCard(oneCard);
  })
   }

 }

// a function to open the cards and change the classes and compare the cards
function openCard(oCards){
openedCards.push(oCards);
if (openedCards.length < 3){
  oCards.className = "card open show unclickable";
}

if (openedCards.length == 2){
  moves += 1;
  document.getElementById('movesCount').innerHTML = moves;
  if (openedCards[0].innerHTML == openedCards[1].innerHTML)
  {
    cardsMatch();
  }
  else {
    cardsUnmatch();
  }

if (moves > 9 && moves < 13){
  for (var i = 0; i < 3 ; i++){
    if (i > 1)
    {
      starsList[i].classList.add('transparentStar');
    }
  }
}

else if (moves > 14){
  for (var i = 0; i < 3 ; i++){
    if (i > 0){
    starsList[i].classList.add('transparentStar');
  }
}
}
}
}

// match cards functoin to change the classes and add the matched cards to a list
function cardsMatch(){
  setTimeout(function(){
openedCards[0].className ='card match unclickable';
openedCards[1].className ='card match unclickable';
matchedCards.push(openedCards[0]);
matchedCards.push(openedCards[1]);
openedCards =[];

// if all cards matched (winning)
if (matchedCards.length == 16){
  openModal();
}
},1000);
}

// unmatch cards function close the open cards
function cardsUnmatch(){
  setTimeout(function(){
openedCards[0].className ='card';
openedCards[1].className ='card';
openedCards =[];
},1000);
}

// congrats modal
function openModal(){
  clearInterval(timeInterval);
  document.getElementById('movesTotal').innerHTML = moves;
  document.getElementById('timeSpent').innerHTML = totalTime;
  document.getElementById('modalStars').innerHTML = document.getElementById('strs').innerHTML;
  document.getElementById('congratsModal').style.display ='block';

}

// loop in cards to add event listner to the click on a card
for (let one of cards) {
   one.addEventListener('click', function(event) {
     if (moves == 0) {
       stopTimer();
       timeInterval = setInterval(function(){
         timer.innerHTML = totalTime;
         totalTime++;
       },1000);
     }
     openCard(one);
   })
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// to close the modal on click on close or play again
function closeModalFun(e){
let modal = document.getElementById('congratsModal').style.display ="none";
}

// to stop the timer on winning
function stopTimer(){
  clearInterval(timeInterval);
  window.clearInterval(timeInterval);
  totalTime =0;
  timer.innerHTML =totalTime;
}
