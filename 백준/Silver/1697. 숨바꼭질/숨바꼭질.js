/* 입력 */
let fs = require("fs");
let [N, K] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

/* 풀이 */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const value = this.head.value;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail = this.head;
    }

    this.size--;
    return value;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const MAX = 100000;
const level = Array(MAX + 1).fill(Infinity);
const direction = [(cur) => cur + 1, (cur) => cur - 1, (cur) => cur * 2];
const queue = new Queue();
queue.enqueue(N);
level[N] = 0;
let done = false;

const isValidRange = (num) => 0 <= num && num < MAX + 1;

while (!queue.isEmpty() && !done) {
  const cur = queue.dequeue();

  for (const fn of direction) {
    const next = fn(cur);

    if (isValidRange(next) && level[next] === Infinity) {
      level[next] = level[cur] + 1;

      if (next === K) {
        done = true;
        break;
      }

      queue.enqueue(next);
    }
  }
}

console.log(level[K]);
