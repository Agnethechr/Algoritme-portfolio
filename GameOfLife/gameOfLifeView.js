"use strict";

export class GameOfLifeView {
  constructor(containerId, rows, cols, cellSize = 20) {
    this.container = document.getElementById(containerId);
    this.rows = rows;
    this.cols = cols;
    this.cellSize = cellSize;
    this.generation = 0;

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

    this.generationCounter = document.createElement("div");
    this.generationCounter.style.marginTop = "10px";
    this.container.parentElement.appendChild(this.generationCounter);
  }

  render(grid) {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const value = grid.get({ row: r, col: c });
        const index = r * this.cols + c;
        this.cells[index].style.backgroundColor =
          value === 1 ? "black" : "white";
      }
    }
    this.generationCounter.textContent = `Generation: ${this.generation}`;
    this.generation++;
  }

  resetCounter() {
    this.generation = 0;
    this.generationCounter.textContent = `Generation: 0`;
  }
}
