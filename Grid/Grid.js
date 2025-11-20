"use strict";

export class Grid {
  constructor(rows, cols) {
    if (rows <= 0 || cols <= 0) {
      throw new RangeError("Rows and cols must be positive integers");
    }

    this._rows = rows;
    this._cols = cols;
    this._size = rows * cols;
    this._array = new Array(this._size).fill(null);
  }

  rows() {
    return this._rows;
  }

  cols() {
    return this._cols;
  }

  size() {
    return this._size;
  }

  fill(value) {
    this._array.fill(value);
  }

  indexFor({ row, col }) {
    if (!this.#isValid(row, col)) return -1;
    return row * this._cols + col;
  }

  rowColFor(index) {
    if (index < 0 || index >= this._size) return null;
    const row = Math.floor(index / this._cols);
    const col = index % this._cols;
    return { row, col };
  }

  set({ row, col }, value) {
    if (!this.#isValid(row, col)) return;
    const index = this.indexFor({ row, col });
    this._array[index] = value;
  }

  get({ row, col }) {
    if (!this.#isValid(row, col)) return undefined;
    const index = this.indexFor({ row, col });
    return this._array[index];
  }

  neighbours({ row, col }) {
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

    const result = [];

    for (const [dr, dc] of deltas) {
      const nr = row + dr;
      const nc = col + dc;
      if (this.#isValid(nr, nc)) {
        result.push({ row: nr, col: nc });
      }
    }

    return result;
  }

  neighbourValues({ row, col }) {
    return this.neighbours({ row, col }).map(({ row, col }) =>
      this.get({ row, col })
    );
  }

  north({ row, col }) {
    if (!this.#isValid(row - 1, col)) return undefined;
    return this._cell(row - 1, col);
  }

  south({ row, col }) {
    if (!this.#isValid(row + 1, col)) return undefined;
    return this._cell(row + 1, col);
  }

  west({ row, col }) {
    if (!this.#isValid(row, col - 1)) return undefined;
    return this._cell(row, col - 1);
  }

  east({ row, col }) {
    if (!this.#isValid(row, col + 1)) return undefined;
    return this._cell(row, col + 1);
  }

  nextInRow({ row, col }) {
    return this.east({ row, col });
  }

  nextInCol({ row, col }) {
    return this.south({ row, col });
  }

  #isValid(row, col) {
    return row >= 0 && row < this._rows && col >= 0 && col < this._cols;
  }

  _cell(row, col) {
    return { row, col, value: this.get({ row, col }) };
  }
}
