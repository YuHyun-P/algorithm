const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(T, testCase) {
  class Node {
    constructor(value, prev = null, next = null) {
      this.value = value;
      this.prev = prev;
      this.next = next;
    }
  }
  class DoublyLinkedList {
    constructor() {
      const DUMMY = new Node(null);
      this.head = this.tail = DUMMY;
    }
    addLast(value) {
      const newNode = new Node(value, this.tail);
      this.tail.next = newNode;
      this.tail = newNode;
      return newNode;
    }
    insert(node, value) {
      if (node === this.tail) {
        return this.addLast(value);
      }

      let newNode = null;
      if (node === null) {
        newNode = new Node(value, this.head);
        this.head.next = newNode;
        this.tail = newNode;
      } else {
        const nextNode = node.next;
        newNode = new Node(value, node, nextNode);
        node.next = newNode;
        nextNode.prev = newNode;
      }

      return newNode;
    }
    remove(node) {
      if (!node) {
        return node;
      }
      if (node === this.head) {
        return node;
      }
      if (node === this.tail) {
        const prevNode = this.tail.prev;
        prevNode.next = null;
        node.prev = null;
        this.tail = prevNode;
        return prevNode;
      }
      const prevNode = node.prev;
      const nextNode = node.next;
      node.prev = node.next = null;
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      return prevNode;
    }
    left(node) {
      return node?.prev ?? node;
    }
    right(node) {
      return node?.next ?? node;
    }
    toString() {
      let cur = this.head.next;
      let result = "";
      while (cur) {
        result += cur.value;
        cur = cur.next;
      }
      return result;
    }
  }
  const analyze = (log) => {
    const list = new DoublyLinkedList();
    let cursor = null;

    for (const char of log) {
      switch (char) {
        case "<":
          cursor = list.left(cursor);
          break;
        case ">":
          cursor = list.right(cursor);
          break;
        case "-":
          cursor = list.remove(cursor);
          break;
        default:
          cursor = list.insert(cursor, char);
      }
    }

    return list.toString();
  };

  return testCase.map(analyze);
}

const T = Number(input.shift().trim());
const testCase = input.map((row) => row.trim());
console.log(solution(T, testCase).join("\n"));
