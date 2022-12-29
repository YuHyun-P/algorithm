const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution(N, K) {
  const sequence = [];
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  class CircularLinkedList {
    head = null;
    add(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        newNode.next = this.head;
        return;
      }

      newNode.next = this.head.next;
      this.head.next = newNode;
      this.head = newNode;
    }
    remove(k) {
      if (this.head.next === this.head) {
        const value = this.head.value;
        this.head = null;
        return value;
      }

      let prev = null;
      while (k) {
        prev = this.head;
        this.head = this.head.next;
        k--;
      }
      const removed = this.head;
      prev.next = removed.next;
      this.head = prev;
      removed.next = null;
      return removed.value;
    }
  }

  const list = new CircularLinkedList();
  for (let i = 1; i < N + 1; i++) {
    list.add(i);
  }
  for (let i = 0; i < N; i++) {
    sequence.push(list.remove(K));
  }
  return sequence;
}

const [N, K] = input.map(Number);
console.log(`<${solution(N, K).join(", ")}>`);
