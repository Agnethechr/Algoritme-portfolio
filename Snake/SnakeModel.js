"use strict";
import { Queue } from "..Queue/queue.js";

export class SnakeModel {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.snake = new Queue();
    const startRow = Math.floor(rows / 2);
    const startCol = Math.floor(cols / 2);
    this.snake.enqueue({ row: startRow, col: startCol });

    this.direction = "RIGHT";
    this.nextDirection = "RIGHT";
    this.food = null;
    this.spawnFood();
    this.growNextTick = false;
    this.gameOver = false;
  }

  setDirection(dir) {
    const opposite = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
    if (dir !== opposite[this.direction]) {
      this.nextDirection = dir;
    }
  }

  spawnFood() {
    let placed = false;
    while (!placed) {
      const r = Math.floor(Math.random() * this.rows);
      const c = Math.floor(Math.random() * this.cols);

      let collision = false;
      for (let i = 0; i < this.snake.size(); i++) {
        const s = this.snake.get(i);
        if (s.row === r && s.col === c) {
          collision = true;
          break;
        }
      }

      if (!collision) {
        this.food = { row: r, col: c };
        placed = true;
      }
    }
  }

  tick() {
    if (this.gameOver) return;

    this.direction = this.nextDirection;

    const head = this.snake.peek();
    let newHead = { row: head.row, col: head.col };

    switch (this.direction) {
      case "UP":
        newHead.row--;
        break;
      case "DOWN":
        newHead.row++;
        break;
      case "LEFT":
        newHead.col--;
        break;
      case "RIGHT":
        newHead.col++;
        break;
    }

    if (newHead.row < 0) newHead.row = this.rows - 1;
    if (newHead.row >= this.rows) newHead.row = 0;
    if (newHead.col < 0) newHead.col = this.cols - 1;
    if (newHead.col >= this.cols) newHead.col = 0;

    for (let i = 0; i < this.snake.size(); i++) {
      const s = this.snake.get(i);
      if (s.row === newHead.row && s.col === newHead.col) {
        this.gameOver = true;
        return;
      }
    }

    this.snake.enqueue(newHead);

    if (
      this.food &&
      newHead.row === this.food.row &&
      newHead.col === this.food.col
    ) {
      this.growNextTick = true;
      this.food = null;
      setTimeout(() => this.spawnFood(), 500);
    }

    if (!this.growNextTick) {
      this.snake.dequeue();
    } else {
      this.growNextTick = false;
    }
  }
}
