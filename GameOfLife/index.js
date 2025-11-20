
import { GameOfLifeModel } from "./gameOfLifeModel.js";
import { GameOfLifeView } from "./gameOfLifeView.js";

const ROWS = 20;
const COLS = 20;

const model = new GameOfLifeModel(ROWS, COLS);
const view = new GameOfLifeView("grid-container", ROWS, COLS, 25);


document.getElementById("btn-clear").addEventListener("click", () => {
  model.clear();
  view.render(model.grid);
  view.resetCounter();
});

document.getElementById("btn-random").addEventListener("click", () => {
  model.randomize(Math.floor(ROWS * COLS / 4));
  view.render(model.grid);
});


function tick() {
  model.nextGeneration();
  view.render(model.grid);
}

view.render(model.grid);
setInterval(tick, 500);
