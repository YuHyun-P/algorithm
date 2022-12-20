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
    this.head = this.tail = null;
    this.enqueue(value);
  }
  enqueue(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
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

const LIMIT = 10;
const [N, M] = input
  .shift()
  .trim()
  .split(" ")
  .map((char) => Number(char) - 2);
const board = input
  .slice(1, -1)
  .map((row) => row.trim().slice(1, -1).split(""));

const red = [0, 0];
const blue = [0, 0];
const target = [0, 0];

board.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    switch (col) {
      case "B":
        [blue[0], blue[1]] = [rowIndex, colIndex];
        break;
      case "R":
        [red[0], red[1]] = [rowIndex, colIndex];
        break;
      case "O":
        [target[0], target[1]] = [rowIndex, colIndex];
        break;
    }
  });
});

const bfs = () => {
  const dRow = [0, -1, 0, 1];
  const dCol = [1, 0, -1, 0];
  const visited = new Set();
  visited.add([red[0], red[1], blue[0], blue[1]].join("-"));

  const isValid = (row, col) => 0 <= row && row < N && 0 <= col && col < M;
  const isTarget = (row, col) => row === target[0] && col === target[1];
  const isSame = (rowA, colA, rowB, colB) => rowA === rowB && colA === colB;
  const getNext = ([row, col], [dRow, dCol]) => {
    let curRow = row;
    let curCol = col;

    while (isValid(curRow + dRow, curCol + dCol)) {
      const cell = board[curRow + dRow][curCol + dCol];
      if (cell === "#") {
        break;
      }

      curRow += dRow;
      curCol += dCol;

      if (cell === "O") {
        break;
      }
    }

    return [curRow, curCol];
  };

  const queue = new Queue({ red, blue, count: 0 });

  let minMove = -1;

  while (!queue.isEmpty()) {
    const { red, blue, count } = queue.dequeue();
    const [redRow, redCol] = red;
    const [blueRow, blueCol] = blue;

    if (isTarget(redRow, redCol)) {
      minMove = count;
      break;
    }

    if (count >= LIMIT) {
      continue;
    }

    for (let move = 0; move < dRow.length; move++) {
      let [nextRedRow, nextRedCol] = getNext(
        [redRow, redCol],
        [dRow[move], dCol[move]]
      );
      let [nextBlueRow, nextBlueCol] = getNext(
        [blueRow, blueCol],
        [dRow[move], dCol[move]]
      );

      if (isSame(nextRedRow, nextRedCol, nextBlueRow, nextBlueCol)) {
        if (isTarget(nextRedRow, nextRedCol)) {
          continue;
        }

        switch (move) {
          case 0:
            if (redCol > blueCol) {
              nextBlueCol -= 1;
            } else {
              nextRedCol -= 1;
            }
            break;
          case 1:
            if (redRow > blueRow) {
              nextRedRow += 1;
            } else {
              nextBlueRow += 1;
            }
            break;
          case 2:
            if (redCol > blueCol) {
              nextRedCol += 1;
            } else {
              nextBlueCol += 1;
            }
            break;
          case 3:
            if (redRow > blueRow) {
              nextBlueRow -= 1;
            } else {
              nextRedRow -= 1;
            }
            break;
        }
      } else {
        if (isTarget(nextBlueRow, nextBlueCol)) {
          continue;
        }
      }

      if (
        !isValid(nextRedRow, nextRedCol) ||
        !isValid(nextBlueRow, nextBlueCol) ||
        visited.has(
          [nextRedRow, nextRedCol, nextBlueRow, nextBlueCol].join("-")
        )
      ) {
        continue;
      }

      visited.add([nextRedRow, nextRedCol, nextBlueRow, nextBlueCol].join("-"));

      queue.enqueue({
        red: [nextRedRow, nextRedCol],
        blue: [nextBlueRow, nextBlueCol],
        count: count + 1,
      });
    }
  }
  return minMove;
};

console.log(bfs());
