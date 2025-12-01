export class Node {
    constructor(value) {
        this.value = value;
        this.parent = null;
        this.childNodes = [];
    }

    firstChild() {
        return this.childNodes[0] ?? null;
    }

    lastChild() {
        return this.childNodes[this.childNodes.length - 1] ?? null;
    }

    hasChildNodes() {
        return this.childNodes.length > 0;
    }

    appendChild(child) {
        child.parent = this;
        this.childNodes.push(child);
    }

    removeChild(child) {
        const index = this.childNodes.indexOf(child);
        if (index !== -1) {
            child.parent = null;
            this.childNodes.splice(index, 1);
        }
    }

    replaceChild(newChild, oldChild) {
        const index = this.childNodes.indexOf(oldChild);
        if (index !== -1) {
            oldChild.parent = null;
            newChild.parent = this;
            this.childNodes[index] = newChild;
        }
    }
}
