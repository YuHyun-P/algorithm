const { timeStamp } = require("console");
const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const N = Number(input.shift().trim());
const board = input.map((line) => line.trim().split(" ").map(Number));

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
    if (this.head === null) {
      this.head = this.tail = newNode;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
  }

  dequeue() {
    if (this.head === null) {
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

const [sharkRow, sharkCol] = (() => {
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (board[row][col] === 9) {
        return [row, col];
      }
    }
  }
  return [-1, -1];
})();
board[sharkRow][sharkCol] = 0;

let fishCount = (() => {
  let count = 0;
  board.forEach((row) =>
    row.forEach((col) => {
      switch (col) {
        case 0:
        case 9:
          break;
        default:
          count += 1;
      }
    })
  );

  return count;
})();

const getClosestFish = (sharkSize, startRow, startCol) => {
  const dRow = [-1, 0, 0, 1];
  const dCol = [0, -1, 1, 0];
  const visited = Array.from(Array(N), () => Array(N).fill(false));
  const queue = new Queue({
    row: startRow,
    col: startCol,
    level: 0,
  });
  const fishArray = [];
  let minLevel = Infinity;

  const isValid = (row, col) => 0 <= row && row < N && 0 <= col && col < N;
  const canMove = (fishSize) => fishSize <= sharkSize;

  while (!queue.isEmpty()) {
    const { row, col, level } = queue.dequeue();
    if (level >= minLevel) {
      continue;
    }

    for (let move = 0; move < 4; move++) {
      const nextRow = row + dRow[move];
      const nextCol = col + dCol[move];

      if (
        !isValid(nextRow, nextCol) ||
        !canMove(board[nextRow][nextCol]) ||
        visited[nextRow][nextCol]
      ) {
        continue;
      }

      visited[nextRow][nextCol] = true;

      const fishSize = board[nextRow][nextCol];
      if (0 < fishSize && fishSize < sharkSize) {
        minLevel = Math.min(minLevel, level + 1);
        fishArray.push([nextRow, nextCol]);
      }

      queue.enqueue({
        row: nextRow,
        col: nextCol,
        level: level + 1,
      });
    }
  }

  return { fish: fishArray, level: minLevel };
};

const shark = {
  row: sharkRow,
  col: sharkCol,
  move: 0,
  eaten: 0,
  size: 2,
};

while (fishCount > 0) {
  const { row, col, eaten, size } = shark;
  const { fish, level } = getClosestFish(size, row, col);

  if (fish.length === 0) {
    break;
  }

  fish.sort(([rowA, colA], [rowB, colB]) => {
    const diffRow = rowA - rowB;
    const diffCol = colA - colB;
    return diffRow !== 0 ? diffRow : diffCol;
  });
  const [firstFishRow, firstFishCol] = fish[0];
  board[firstFishRow][firstFishCol] = 0;

  shark.move += level;
  shark.row = firstFishRow;
  shark.col = firstFishCol;

  if (eaten + 1 === size) {
    shark.eaten = 0;
    shark.size += 1;
  } else {
    shark.eaten += 1;
  }

  fishCount -= 1;
}

console.log(shark.move);
