class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insert(data) {
        const node = new Node(data);
        if (!this.size()) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.next = null;
            node.prev = this.tail;
            this.tail = node;
        }
    }

    size() {
        if (!this.head) {
            return 0;
        }
        let i = 1, currentNode = this.head;
        while (currentNode.next) {
            currentNode = currentNode.next;
            i++;
        }
        return i;
    }

    at(index) {
        let arr = this.toArray();
        if (arr.length === 0 || index >= arr.length) {
            return null;
        }
        return arr[index];
    }

    findNode(data) {
        if (!this.size()) {
            return 'Your list is empty';//??????
        }
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.data === data) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    toArray() {
        if (!this.size()) {
            return [];
        }
        let arr = [];
        let currentNode = this.head;
        while (currentNode) {
            arr.push(currentNode.data);
            currentNode = currentNode.next;
        }
        return arr;
    }

    removeAt(index) {
        if (this.size()) {
            let data = this.at(index);
            let nodeToDelete = this.findNode(data);
            if (this.size() === 1) {
                nodeToDelete = this.head = this.tail = null;
                console.log(this);
            } else if (nodeToDelete === this.tail) {
                nodeToDelete.prev.next = null;
                this.tail = nodeToDelete.prev;
                nodeToDelete = null;
            } else if (nodeToDelete === this.head) {
                nodeToDelete.next.prev = null;
                this.head = nodeToDelete.next;
                nodeToDelete = null;
            } else {
                nodeToDelete.prev.next = nodeToDelete.next;
                nodeToDelete.next.prev = nodeToDelete.prev;
                nodeToDelete = null;
            }
        }
    }
    moveToFront(node) {
        if (node === this.tail && this.size() !== 1) {
            node.prev.next = null;
            this.tail = node.prev;
            this.head.prev = node;
            node.next = this.head;
            node.prev = null;
            this.head = node;
        } else if (node !== this.head && this.size() !== 1) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            this.head.prev = node;
            node.next = this.head;
            node.prev = null;
            this.head = node;
        }
    }
    reorganize(data) {
        var nodeToMove = this.findNode(data);
        if (nodeToMove instanceof Node) {
            this.moveToFront(nodeToMove);
            return true;
        }
        return false;
    }
}

module.exports = {
    SelfOrganizedList,
    Node
};