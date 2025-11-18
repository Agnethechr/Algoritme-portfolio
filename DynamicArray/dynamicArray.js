"use strict";

import { StaticArray } from "../staticarray/staticarray.js";

export class DynamicArray {
  constructor(capacity = 10) {
    this._capacity = capacity;
    this._size = 0;
    this._array = new StaticArray(capacity);
  }

  size() {
    return this._size;
  }

  capacity() {
    return this._capacity;
  }

  get(index) {
    this.#checkIndex(index);
    return this._array.get(index);
  }

  set(index, item) {
    this.#checkIndex(index);
    this._array.set(index, item);
  }

  add(item) {
    if (this._size >= this._capacity) {
      this.grow();
    }

    this._array.set(this._size, item);
    this._size++;
  }

  grow() {
    const newCapacity = this._capacity * 2;
    const newArray = new StaticArray(newCapacity);

    // kopier alle elementer
    for (let i = 0; i < this._size; i++) {
      newArray.set(i, this._array.get(i));
    }

    // opdatér referencer
    this._array = newArray;
    this._capacity = newCapacity;
  }

  insert(index, item) {
    if (index < 0 || index > this._size) {
      throw new RangeError("Index out of bounds in insert()");
    }

    if (this._size >= this._capacity) {
      this.grow();
    }

    for (let i = this._size; i > index; i--) {
      this._array.set(i, this._array.get(i - 1));
    }

    this._array.set(index, item);
    this._size++;
  }

  remove(index) {
    this.#checkIndex(index);

    for (let i = index; i < this._size - 1; i++) {
      this._array.set(i, this._array.get(i + 1));
    }

    this._size--;
  }

  clear() {
    this._size = 0;
  }

  #checkIndex(index) {
    if (index < 0 || index >= this._size) {
      throw new RangeError(
        `Index ${index} is out of bounds (size: ${this._size})`
      );
    }
  }
}
