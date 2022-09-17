/* 입력 */
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const [M, N] = input[0].trim().split(" ").map(Number);
const tomatoField = Array.from(Array(N), (_, index) =>
  input[1 + index].trim().split(" ").map(Number)
);

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

  push(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  shift() {
    if (this.size === 0) return undefined;

    const value = this.head.value;
    this.head = this.head.next;
    this.size--;

    if (this.size === 0) this.tail = null;
    return value;
  }

  length() {
    return this.size;
  }
}

const EMPTY_CELL = -1;
const TOMATO_CELL = 1;

const ripeDates = Array.from(Array(N), (_, r) =>
  tomatoField[r].map((cell) => (cell === EMPTY_CELL ? EMPTY_CELL : Infinity))
);
const visited = Array.from(Array(N), () => Array(M).fill(false));

const queue = new Queue();
tomatoField.forEach((row, r) => {
  row.forEach((cell, c) => {
    if (cell === TOMATO_CELL) {
      queue.push([r, c]);
      ripeDates[r][c] = 0;
      visited[r][c] = true;
    }
  });
});

const isValidRange = (r, c) => 0 <= r && r < N && 0 <= c && c < M;
const isEmpty = (r, c) => tomatoField[r][c] === EMPTY_CELL;

const DIRECTION = 4;
// right up down left
const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

while (queue.length() > 0) {
  const [curR, curC] = queue.shift();
  const curDate = ripeDates[curR][curC];

  for (let index = 0; index < DIRECTION; index++) {
    const nextR = curR + dr[index];
    const nextC = curC + dc[index];

    if (
      isValidRange(nextR, nextC) &&
      !isEmpty(nextR, nextC) &&
      !visited[nextR][nextC]
    ) {
      ripeDates[nextR][nextC] = Math.min(ripeDates[nextR][nextC], curDate + 1);
      queue.push([nextR, nextC]);
      visited[nextR][nextC] = true;
    }
  }
}

const max = ripeDates.reduce(
  (acc, row) =>
    Math.max(
      acc,
      row.reduce((acc, date) => Math.max(acc, date), -1)
    ),
  -1
);

console.log(max === Infinity ? -1 : max);
