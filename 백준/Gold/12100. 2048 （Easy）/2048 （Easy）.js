const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const N = Number(input.shift().trim());
const board = input.map((row) => row.trim().split(" ").map(Number));

const LIMIT = 5;
let max = 0;

const merge = (direction, board) => {
  // direction 0: Right, 1: Down, 2: Left, 3: Up

  switch (direction) {
    case 0:
      mergeRow(1, board);
      break;
    case 1:
      mergeCol(1, board);
      break;
    case 2:
      mergeRow(-1, board);
      break;
    case 3:
      mergeCol(-1, board);
      break;
    default:
      throw new Error(`Invalid direction ${direction}`);
  }
};

const mergeRow = (direction, board) => {
  for (let row = 0; row < N; row++) {
    const rowWithoutZero = board[row].filter((num) => num !== 0);
    const stack =
      direction === 1 ? [...rowWithoutZero] : [...rowWithoutZero.reverse()];
    const mergedRow = [];
    let last = 0;

    while (stack.length) {
      const num = stack.pop();
      if (last > 0 && num === last) {
        mergedRow.pop();
        mergedRow.push(num * 2);
        last = 0;
        continue;
      }
      mergedRow.push(num);
      last = num;
    }
    while (mergedRow.length < N) {
      mergedRow.push(0);
    }
    board[row] = direction === 1 ? mergedRow.reverse() : mergedRow;
  }
};
const mergeCol = (direction, board) => {
  for (let col = 0; col < N; col++) {
    const colWithoutZero = board
      .map((row) => row[col])
      .filter((num) => num !== 0);
    const stack = direction === 1 ? colWithoutZero : colWithoutZero.reverse();
    const mergedCol = [];
    let last = 0;

    while (stack.length) {
      const num = stack.pop();
      if (last > 0 && num === last) {
        mergedCol.pop();
        mergedCol.push(num * 2);
        last = 0;
        continue;
      }
      mergedCol.push(num);
      last = num;
    }
    while (mergedCol.length < N) {
      mergedCol.push(0);
    }
    if (direction === 1) {
      mergedCol.reverse();
    }
    mergedCol.forEach((num, row) => {
      board[row][col] = num;
    });
  }
};

const dfs = (level, board) => {
  max = Math.max(max, ...board.flat());
  if (level === LIMIT) {
    return;
  }

  const before = board.map((row) => row.join(" ")).join("\n");
  for (let direction = 0; direction < 4; direction++) {
    merge(direction, board);
    const after = board.map((row) => row.join(" ")).join("\n");

    if (before === after) {
      continue;
    }

    dfs(level + 1, board);
    board = before.split("\n").map((row) => row.split(" ").map(Number));
  }
};
dfs(0, board);
console.log(max);
