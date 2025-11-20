"use strict";

export class SnakeView {
  constructor(containerId, rows, cols, cellSize) {
    this.container = document.getElementById(containerId);
    this.rows = rows;
    this.cols = cols;
    this.cellSize = cellSize;

    this.container.style.display = "grid";
    this.container.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
    this.container.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;

    this.cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const div = document.createElement("div");
        div.style.width = `${cellSize}px`;
        div.style.height = `${cellSize}px`;
        div.style.border = "1px solid #ccc";
        div.style.backgroundColor = "white";
        this.container.appendChild(div);
        this.cells.push(div);
      }
    }
  }

  render(model) {

    this.cells.forEach(cell => cell.style.backgroundColor = "white");


    for (let i = 0; i < model.snake.size(); i++) {
      const s = model.snake.get(i);
      const index = s.row * this.cols + s.col;
      this.cells[index].style.backgroundColor = "blue";
    }

    if (model.food) {
      const index = model.food.row * this.cols + model.food.col;
      this.cells[index].style.backgroundColor = "yellow";
    }
  }
}
