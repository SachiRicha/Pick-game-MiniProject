"user strict";

// selecting elements
const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");

const score0El = document.querySelector("#score-0");
const score1El = document.getElementById("score-1");
// both upper statement will do same thing but getelementbyid is little faster than queryselector but i guess its only relevent while selecting like thousands of elements at once.
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const current0El = document.querySelector("#current-0");
const current1El = document.querySelector("#current-1");

let scores, currentScore, activePlayer, playing;

const init = function () {
  // internal state variable
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");
  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //visual changes on active player
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};

// starting condition
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add("hidden");

// Rolling dice fuctionaity
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generatig a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // 3.Check for rolled 1: if true,switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// class list property is used to remove or add any class in dom manipulation
//classList.toggle() - will remove the class if it is present and if it is not then it will add the class

//hold button functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add current score to the score of active player
    scores[activePlayer] += currentScore;

    //scores[1] = scores[1] + currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player score <= 100
    if (scores[activePlayer] >= 10) {
      // if yes, finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
    } else {
      switchPlayer();
    }
  }
});

//resetting the game while clicking on new game button

btnNew.addEventListener("click", init);
