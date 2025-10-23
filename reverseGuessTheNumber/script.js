"use strict";

window.addEventListener("DOMContentLoaded", main);

// brug let frem for const da const ikke kan ændres senere i programmet.
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

//Starter altid med et gæt på 50
function makeGuess() {
  guess = Math.floor((min + max) / 2);
  attempts++;
  document.querySelector("#guessDisplay").textContent = `Mit gæt er: ${guess}`;
}

//Halvere gættet
function tooHigh() {
  if (gameOver) return;
  max = guess - 1;
  console.log("For højt!");
  makeGuess();
}

//Fordobler gættet
function tooLow() {
  if (gameOver) return;
  min = guess + 1;
  console.log("For lavt!");
  makeGuess();
}

//Hvis gættet er korrekt viser der både hvad det rigtige tal var og hvor mange forsøg det tog.
function correct() {
  if (gameOver) return;
  gameOver = true;
  console.log("Korrekt!");

  document.querySelector("#guessDisplay").textContent = `Jeg gættede rigtigt! Tallet var: ${guess}`;
  document.querySelector("#result").textContent = `Antal forsøg: ${attempts}`;
}