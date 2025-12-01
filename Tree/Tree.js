import { Node } from "./Node.js";

export class Tree {
    constructor() {
        this.root = null;
    }

    printTree(node = this.root, indent = 0) {
        if (!node) {
            console.log("(tomt træ)");
            return;
        }

        console.log(" ".repeat(indent) + "- " + node.value);

        for (let child of node.childNodes) {
            this.printTree(child, indent + 2);
        }
    }

    addValue(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode;
        } else {
 
            this.root.appendChild(newNode);
        }

        return newNode;
    }

    findValue(value, node = this.root) {
        if (!node) return null;
        if (node.value === value) return node;

        for (let child of node.childNodes) {
            const found = this.findValue(value, child);
            if (found) return found;
        }

        return null;
    }

    removeValue(value) {
        const target = this.findValue(value);
        if (!target) return false;

        if (target === this.root) {
            this.root = null;
            return true;
        }

        target.parent.removeChild(target);
        return true;
    }
}
