import { SnakeModel } from "../Snake/SnakeModel.js";
import { SnakeView } from "../Snake/SnakeView.js";

export const GRID_ROWS = 20;    
export const GRID_COLS = 30;      
export const CELL_SIZE = 20;    
export const TICK_INTERVAL = 200;

const model = new SnakeModel(GRID_ROWS, GRID_COLS);
const view = new SnakeView("grid-container", GRID_ROWS, GRID_COLS, CELL_SIZE);

view.render(model);

window.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp": model.setDirection("UP"); break;
    case "ArrowDown": model.setDirection("DOWN"); break;
    case "ArrowLeft": model.setDirection("LEFT"); break;
    case "ArrowRight": model.setDirection("RIGHT"); break;
  }
});


const interval = setInterval(() => {
  if (model.gameOver) {
    alert("Game Over!");
    clearInterval(interval);
    return;
  }
  model.tick();
  view.render(model);
}, TICK_INTERVAL);
