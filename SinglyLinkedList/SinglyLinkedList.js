"use strict";

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class SinglyLinkedList {
  constructor() {
    this.head = null;
    this._size = 0; 
  }

  #checkIndex(index) {
    if (index < 0 || index >= this._size) {
      throw new RangeError(
        `Index ${index} out of bounds (size: ${this._size})`
      );
    }
  }

  size() {
    return this._size;
  }

  clear() {
    this.head = null;
    this._size = 0;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    this._size++;
  }

  get(index) {
    return this.getNode(index).data;
  }

  getFirst() {
    if (!this.head) return null;
    return this.head.data;
  }

  getLast() {
    if (!this.head) return null;
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current.data;
  }

  set(index, data) {
    const node = this.getNode(index);
    node.data = data;
  }

  insert(index, data) {
    if (index < 0 || index > this._size) {
      throw new RangeError(`Index ${index} out of bounds`);
    }

    const newNode = new Node(data);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      const prev = this.getNode(index - 1);
      newNode.next = prev.next;
      prev.next = newNode;
    }

    this._size++;
  }

  remove(index) {
    this.#checkIndex(index);
    let removedData;

    if (index === 0) {
      removedData = this.head.data;
      this.head = this.head.next;
    } else {
      const prev = this.getNode(index - 1);
      removedData = prev.next.data;
      prev.next = prev.next.next;
    }

    this._size--;
    return removedData;
  }

  removeFirst() {
    if (!this.head) return null;
    const data = this.head.data;
    this.head = this.head.next;
    this._size--;
    return data;
  }

  removeLast() {
    if (!this.head) return null;

    if (!this.head.next) {
      const data = this.head.data;
      this.head = null;
      this._size--;
      return data;
    }

    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }

    const data = current.next.data;
    current.next = null;
    this._size--;
    return data;
  }

  getNode(index) {
    this.#checkIndex(index);
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  getFirstNode() {
    return this.head;
  }

  getLastNode() {
    if (!this.head) return null;
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current;
  }

  getNextNode(node) {
    if (!node) return null;
    return node.next;
  }

  getPreviousNode(node) {
    if (!node || node === this.head) return null;

    let current = this.head;
    while (current && current.next !== node) {
      current = current.next;
    }

    return current || null;
  }

  insertBefore(node, data) {
    if (!node) return;

    const newNode = new Node(data);

    if (node === this.head) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      const prev = this.getPreviousNode(node);
      newNode.next = node;
      prev.next = newNode;
    }

    this._size++;
  }

  insertAfter(node, data) {
    if (!node) return;

    const newNode = new Node(data);
    newNode.next = node.next;
    node.next = newNode;
    this._size++;
  }

  removeNode(node) {
    if (!node) return null;

    if (node === this.head) {
      return this.removeFirst();
    } else {
      const prev = this.getPreviousNode(node);
      if (!prev) return null;

      const data = node.data;
      prev.next = node.next;
      this._size--;
      return data;
    }
  }

  printList() {
    let current = this.head;
    let index = 0;
    console.log("LinkedList:");
    while (current) {
      console.log(
        `[${index}] data:`,
        current.data,
        "next:",
        current.next ? "Node" : "null"
      );
      current = current.next;
      index++;
    }
    console.log("Size:", this._size);
  }
}
