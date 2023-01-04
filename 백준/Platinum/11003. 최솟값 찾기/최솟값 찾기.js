const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, L, A) {
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
    }
  }
  class Dequeue {
    head = null;
    tail = null;
    size = 0;
    addLast(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
      this.size += 1;
    }
    removeFirst() {
      if (this.head === this.tail) {
        this.head = this.tail = null;
      } else {
        const nextNode = this.head.next;
        nextNode.prev = null;
        this.head.next = null;
        this.head = nextNode;
      }
      this.size -= 1;
    }
    removeLast() {
      if (this.head === this.tail) {
        this.head = this.tail = null;
      } else {
        const prevNode = this.tail.prev;
        prevNode.next = null;
        this.tail.prev = null;
        this.tail = prevNode;
      }
      this.size -= 1;
    }
    getSize() {
      return this.size;
    }
    getFirst() {
      return this.head?.value;
    }
    getLast() {
      return this.tail?.value;
    }
  }

  const deque = new Dequeue();
  deque.addLast(0);
  let answer = `${A[0]} `;

  for (let index = 1; index < A.length; index++) {
    if (deque.getFirst() < index - L + 1) {
      deque.removeFirst();
    }

    while (deque.getSize() && A[index] <= A[deque.getLast()]) {
      deque.removeLast();
    }
    deque.addLast(index);

    answer += A[deque.getFirst()] + " ";
    if (index % 10000 === 0) {
      process.stdout.write(answer);
      answer = "";
    }
  }

  console.log(answer.trimEnd());
}

const [N, L] = input[0].trim().split(" ").map(Number);
const A = input[1].trim().split(" ").map(Number);
solution(N, L, A);
