export class Stack {
  constructor() {
    this.head = null;    
    this._size = 0;       
  }

 
  #createNode(data, next = null) {
    return { data, next };
  }

  push(data) {  
    const newNode = this.#createNode(data, this.head);
    this.head = newNode;
    this._size++;
  }

  pop() {
    if (!this.head) return null;

    const removed = this.head;
    this.head = this.head.next;
    this._size--;

    return removed.data;
  }

  peek() { 
    return this.head ? this.head.data : null;
  }

  size() {
    return this._size;
  }

  get(index) { 
    if (index < 0 || index >= this._size) return null;

    let current = this.head;
    let i = 0;

    while (i < index) {
      current = current.next;
      i++;
    }
    return current.data;
  }
}
