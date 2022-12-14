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
  constructor(array) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    array.forEach((value) => this.enqueue(value));
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const value = this.head.value;
    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
    }

    this.size -= 1;
    return value;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const [M, N, H] = input.shift().trim().split(" ").map(Number);
const box = Array.from(Array(H), () =>
  input.splice(0, N).map((row) => row.trim().split(" ").map(Number))
);

const bfs = () => {
  let max = 0;
  const dHeight = [0, 0, 0, 0, 1, -1];
  const dRow = [0, 1, 0, -1, 0, 0];
  const dColumn = [1, 0, -1, 0, 0, 0];

  const isValid = (h, r, c) =>
    0 <= h && h < H && 0 <= r && r < N && 0 <= c && c < M;
  const initialRipeTomatoCoord = (() => {
    const temp = [];
    box.forEach((level, h) =>
      level.forEach((row, r) =>
        row.forEach((tomato, c) => tomato === 1 && temp.push([h, r, c]))
      )
    );
    return temp;
  })();
  const ripeTomatoCoord = new Queue(initialRipeTomatoCoord);

  while (!ripeTomatoCoord.isEmpty()) {
    const [h, r, c] = ripeTomatoCoord.dequeue();
    max = Math.max(max, box[h][r][c]);

    for (let move = 0; move < dHeight.length; move++) {
      const [nextH, nextR, nextC] = [
        h + dHeight[move],
        r + dRow[move],
        c + dColumn[move],
      ];
      if (!isValid(nextH, nextR, nextC) || box[nextH][nextR][nextC] !== 0) {
        continue;
      }

      box[nextH][nextR][nextC] = box[h][r][c] + 1;
      ripeTomatoCoord.enqueue([nextH, nextR, nextC]);
    }
  }

  return max;
};

const max = bfs();
console.log(
  box.every((level) => level.every((row) => row.every((col) => col !== 0)))
    ? max - 1
    : -1
);
