"use strict";

export class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  _createNode(data) {
    return { data: data, next: null };
  }

  enqueue(data) {
    const node = this._createNode(data);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this._size++;
  }

  dequeue() {
    if (!this.head) return null;

    const data = this.head.data;
    this.head = this.head.next;

    if (!this.head) {
      // Køen blev tom
      this.tail = null;
    }

    this._size--;
    return data;
  }

  peek() {
    return this.head ? this.head.data : null;
  }

  size() {
    return this._size;
  }

  get(index) {
    if (index < 0 || index >= this._size) {
      throw new RangeError(
        `Index ${index} out of bounds (size: ${this._size})`
      );
    }

    let current = this.head;
    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    return current.data;
  }
}