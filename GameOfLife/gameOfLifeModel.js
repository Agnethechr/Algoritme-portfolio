"use strict";
import { Grid } from "../Grid/Grid.js";

export class GameOfLifeModel {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = new Grid(rows, cols);
    this.grid.fill(0);
  }

  randomize(count = null) {
    let cells = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid.get({ row: r, col: c }) === 1) {
          cells.push({ row: r, col: c });
        }
      }
    }

    let remaining = count ?? Math.floor((this.rows * this.cols) / 4);
    while (remaining > 0) {
      const r = Math.floor(Math.random() * this.rows);
      const c = Math.floor(Math.random() * this.cols);
      if (this.grid.get({ row: r, col: c }) === 0) {
        this.grid.set({ row: r, col: c }, 1);
        remaining--;
      }
    }
  }

  clear() {
    this.grid.fill(0);
  }

  countNeighbours(row, col) {
    const deltas = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    let count = 0;
    for (const [dr, dc] of deltas) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
        count += this.grid.get({ row: nr, col: nc });
      }
    }
    return count;
  }

  nextGeneration() {
    const newGrid = new Grid(this.rows, this.cols);
    newGrid.fill(0);

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const alive = this.grid.get({ row: r, col: c });
        const neighbours = this.countNeighbours(r, c);
        let next = alive;

        if (alive === 1 && (neighbours < 2 || neighbours > 3)) next = 0;
        if (alive === 0 && neighbours === 3) next = 1;

        newGrid.set({ row: r, col: c }, next);
      }
    }

    this.grid = newGrid;
  }
}
