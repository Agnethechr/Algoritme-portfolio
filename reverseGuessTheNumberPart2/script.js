"use strict";

window.addEventListener("DOMContentLoaded", main);

let min = 1;
let max = 100;
let guess = 0;
let attempts = 0;
let gameOver = false;

function main() {
  console.log("JavaScript kører!");

  document.querySelector("#btn_tooHigh").addEventListener("click", tooHigh);
  document.querySelector("#btn_tooLow").addEventListener("click", tooLow);
  document.querySelector("#btn_correct").addEventListener("click", correct);

  makeGuess();
}

function makeGuess() {
  if (min > max) {
    document.querySelector("#guessDisplay").textContent = 
      "Der er ingen mulige tal tilbage.";
    gameOver = true;
    return;
  }


  if (min === max) {
    guess = min;
    gameOver = true;

    document.querySelector("#guessDisplay").textContent =
      `Der er kun én mulighed tilbage: ${guess}`;
    document.querySelector("#result").textContent =
      `Antal forsøg: ${attempts} – og jeg var nødt til at afslutte selv`;
    return;
  }

  guess = Math.floor((min + max) / 2);
  attempts++;

  console.log(`min: ${min}, guess: ${guess}, max: ${max}`);

  document.querySelector("#guessDisplay").textContent = `Mit gæt er: ${guess}`;
}


function tooHigh() {
  if (gameOver) return;

  max = guess - 1;
  console.log("For højt!");
  makeGuess();
}


function tooLow() {
  if (gameOver) return;

  min = guess + 1;
  console.log("For lavt!");
  makeGuess();
}


function correct() {
  if (gameOver) return;

  gameOver = true;
  console.log("Korrekt!");

  document.querySelector("#guessDisplay").textContent = 
    `Jeg gættede rigtigt! Tallet var: ${guess}`;

  let comment = evaluateAttempts(attempts);

  document.querySelector("#result").textContent =
    `Antal forsøg: ${attempts} – ${comment}`;
}

function evaluateAttempts(attempts) {
  if (attempts <= 3) return "Perfekt";
  if (attempts <= 5) return "Rigtig godt";
  if (attempts <= 7) return "OK";
  return "prøv igen";
}
