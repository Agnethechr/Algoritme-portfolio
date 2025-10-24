"use strict";

window.addEventListener("DOMContentLoaded", main);
const number = 42;


function main(){
    console.log("JavaScript kører!");

    document.querySelector("#btn_guess").addEventListener("click",buttonClicked);
}

function buttonClicked(){
    console.log("Der blev klikket på knappen");

    const guess = document.querySelector("#guess").valueAsNumber;
    console.log(guess);

    if(guess > number){
        console.log("Det var for højt");

        document.querySelector("#guesses").insertAdjacentHTML("beforeend",
            `<li>Du gættede på ${guess} - det var for højt</li>`
        );
    }

    if(guess < number){
        console.log("Det var for lavt");

        document.querySelector("#guesses").insertAdjacentHTML("beforeend",
            `<li>Du gættede på ${guess} - det var for lavt</li>`
        );
    }

    if (guess == number){
        document.querySelector("#btn_guess").removeEventListener("click",buttonClicked);
    }
}