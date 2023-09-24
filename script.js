"use strict";
// All the variables we need

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

const diceDisplay = document.querySelector(".dice");
const diceImage = document.querySelector("img");
// this selects both players
const selectPlayers = document.querySelectorAll("section");
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");
const player1Score = document.querySelector(".score--0");
const player2Score = document.querySelector(".score--1");
// score of both players
const score = document.querySelectorAll(".score");
// current score of both players (we'll use it for the reset)
const currentScore = document.querySelectorAll(".current-score");

// we put them here so when the value won't get reset
let scoreOne = 0;
let scoreTwo = 0;
////////////////////////////////////////////////////////////////

function switchPlayersAndSaveScore() {
  // this will update itself everytime we trigger the event listener. If we put it outside the function, it will only save 1 value (of one player) and won't move to then ext player
  const currentScore = document.querySelector(".player--active .current-score");
  // because this is not constant, we need to put it inside the func
  const playerScore = document.querySelector(".player--active .score");

  selectPlayers.forEach((player) => {
    // we select the score value here (when the player gets 1)
    if (player.classList.contains("player--active")) {
      // save the score in each player
      if (playerScore.classList.contains("score--0")) {
        scoreOne += Number(currentScore.textContent);
        player1Score.textContent = scoreOne;
      } else {
        scoreTwo += Number(currentScore.textContent);
        player2Score.textContent = scoreTwo;
      }

      // if the player already has it, remove it
      player.classList.remove("player--active");
      currentScore.textContent = 0;
    } else {
      // if the player doesn't have the style, use it
      player.classList.add("player--active");
    }
  });
}

///////////////////////////////////////////////////////////////

function pigGame() {
  // Roll event listener
  btnRoll.addEventListener("click", btnRollHandler);

  function btnRollHandler() {
    let randomDice = Math.floor(Math.random() * 6 + 1);
    // choose the image
    diceImage.setAttribute("src", `./images/dice-${randomDice}.png`);
    // this will display the image (remove the display:none;)
    diceDisplay.classList.remove("hide");
    // we left this here because we need it at the else statemnt of if randomd = 1
    const currentScore = document.querySelector(
      ".player--active .current-score"
    );

    // if we get 1, we switch players
    if (randomDice === 1) {
      currentScore.textContent = 0;
      switchPlayersAndSaveScore();
    } else {
      currentScore.textContent = Number(currentScore.textContent) + randomDice;
    }
  }

  // hold event listener

  btnHold.addEventListener("click", btnHoldHandler);

  function btnHoldHandler() {
    switchPlayersAndSaveScore();
    if (scoreOne >= 10) {
      playerOne.classList.add("player--winner");
      btnRoll.removeEventListener("click", btnRollHandler);
      btnHold.removeEventListener("click", btnHoldHandler);
      diceDisplay.classList.add("hide");
    } else if (scoreTwo >= 10) {
      playerTwo.classList.add("player--winner");
      btnRoll.removeEventListener("click", btnRollHandler);
      btnHold.removeEventListener("click", btnHoldHandler);
      diceDisplay.classList.add("hide");
    }
  }

  // Reset game:
  btnNew.addEventListener("click", function () {
    scoreOne = 0;
    scoreTwo = 0;
    // score of each player is set to 0
    score.forEach((element) => (element.textContent = 0));
    // current score of each player is set to 0
    currentScore.forEach((element) => (element.textContent = 0));

    // remove the winner style
    playerOne.classList.remove("player--winner");
    playerTwo.classList.remove("player--winner");

    // when the game restards, player one always get the player active
    playerOne.classList.add("player--active");
    playerTwo.classList.remove("player--active");

    // hide the dice
    diceDisplay.classList.add("hide");

    // add the event listener again
    btnRoll.addEventListener("click", btnRollHandler);
    btnHold.addEventListener("click", btnHoldHandler);
  });
}

pigGame();
