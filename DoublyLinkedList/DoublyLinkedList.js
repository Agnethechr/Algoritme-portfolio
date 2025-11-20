"use strict";

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
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
    this.tail = null;
    this._size = 0;
  }

  addLast(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this._size++;
  }

  addFirst(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this._size++;
  }

  get(index) {
    return this.getNode(index).data;
  }

  getFirst() {
    return this.head ? this.head.data : null;
  }

  getLast() {
    return this.tail ? this.tail.data : null;
  }

  set(index, data) {
    const node = this.getNode(index);
    node.data = data;
  }

  insert(index, data) {
    if (index === 0) {
      this.addFirst(data);
    } else if (index === this._size) {
      this.addLast(data);
    } else {
      const nextNode = this.getNode(index);
      this.insertBeforeNode(nextNode, data);
    }
  }

  insertAfter(index, data) {
    if (index === this._size - 1) {
      this.addLast(data);
    } else {
      const node = this.getNode(index);
      this.insertAfterNode(node, data);
    }
  }

  insertBefore(index, data) {
    if (index === 0) {
      this.addFirst(data);
    } else {
      const node = this.getNode(index);
      this.insertBeforeNode(node, data);
    }
  }

  remove(index) {
    const node = this.getNode(index);
    return this.removeNode(node);
  }

  removeFirst() {
    if (!this.head) return null;
    const data = this.head.data;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this._size--;
    return data;
  }

  removeLast() {
    if (!this.tail) return null;
    const data = this.tail.data;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this._size--;
    return data;
  }

  getNode(index) {
    this.#checkIndex(index);
    let current;
    if (index < this._size / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this._size - 1; i > index; i--) {
        current = current.prev;
      }
    }
    return current;
  }

  getFirstNode() {
    return this.head;
  }

  getLastNode() {
    return this.tail;
  }

  getNextNode(node) {
    return node ? node.next : null;
  }

  getPreviousNode(node) {
    return node ? node.prev : null;
  }

  insertBeforeNode(node, data) {
    const newNode = new Node(data);
    if (node === this.head) {
      this.addFirst(data);
    } else {
      newNode.prev = node.prev;
      newNode.next = node;
      node.prev.next = newNode;
      node.prev = newNode;
      this._size++;
    }
  }

  insertAfterNode(node, data) {
    const newNode = new Node(data);
    if (node === this.tail) {
      this.addLast(data);
    } else {
      newNode.next = node.next;
      newNode.prev = node;
      node.next.prev = newNode;
      node.next = newNode;
      this._size++;
    }
  }

  removeNode(node) {
    if (!node) return null;
    const data = node.data;

    if (node === this.head) return this.removeFirst();
    if (node === this.tail) return this.removeLast();

    node.prev.next = node.next;
    node.next.prev = node.prev;
    this._size--;
    return data;
  }

  makeFirst(node) {
    if (!node || node === this.head) return;
    this.removeNode(node);
    this.addFirst(node.data);
  }

  makeLast(node) {
    if (!node || node === this.tail) return;
    this.removeNode(node);
    this.addLast(node.data);
  }

 swap(nodeA, nodeB) {
    if (!nodeA || !nodeB || nodeA === nodeB) return;

    const tempAData = nodeA.data;
    nodeA.data = nodeB.data;
    nodeB.data = tempAData;
  }

  printList() {
    let current = this.head;
    let index = 0;
    console.log("DoublyLinkedList:");
    while (current) {
      console.log(
        `[${index}] data:`,
        current.data,
        "prev:",
        current.prev ? "Node" : "null",
        "next:",
        current.next ? "Node" : "null"
      );
      current = current.next;
      index++;
    }
    console.log("Size:", this._size);
  }
}