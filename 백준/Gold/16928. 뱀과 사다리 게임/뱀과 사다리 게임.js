const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor(value) {
    const newNode = new Node(value);
    this.head = newNode;
    this.tail = newNode;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.tail === null) {
      this.head = this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const value = this.head.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
    }
    return value;
  }

  isEmpty() {
    return this.head === null;
  }
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const board = Array.from(Array(101), (_, index) => index);
input.forEach((line) => {
  const [from, to] = line.trim().split(" ").map(Number);
  board[from] = to;
});
const dice = Array.from(Array(6), (_, index) => index + 1);
const minPathLength = Array(101).fill(Infinity);

const bfs = (start, end) => {
  const queue = new Queue(start);
  minPathLength[start] = 0;

  while (!queue.isEmpty()) {
    const cur = queue.dequeue();
    if (cur === end) {
      break;
    }

    dice.forEach((num) => {
      const next = board[cur + num];
      if (next > end || minPathLength[next] !== Infinity) {
        return;
      }

      minPathLength[next] = minPathLength[cur] + 1;
      queue.enqueue(next);
    });
  }
};
bfs(1, 100);
console.log(minPathLength[100]);
