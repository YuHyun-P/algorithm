const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const BOARD_SIZE = 8;
const [N, M] = input[0].split(" ").map(Number);
const board = [];
for (let line = 1; line <= N; line++) {
  board.push(input[line].trim().split(""));
}

let min = Infinity;
for (let row = 0; row <= N - BOARD_SIZE; row++) {
  for (let col = 0; col <= M - BOARD_SIZE; col++) {
    const count = getCount(board, row, col);
    min = Math.min(min, count);
  }
}
console.log(min);

function getCount(board, leftTopRow, leftTopCol) {
  const WHITE = "W";
  const BLACK = "B";

  const caseWB = {
    white: { before: BLACK, count: 0 },
    black: { before: WHITE, count: 0 },
  };

  for (let row = leftTopRow; row < leftTopRow + BOARD_SIZE; row++) {
    for (let col = leftTopCol; col < leftTopCol + BOARD_SIZE; col++) {
      const cur = board[row][col];
      caseWB.white.before === cur && caseWB.white.count++;
      caseWB.black.before === cur && caseWB.black.count++;

      if (col === leftTopCol + BOARD_SIZE - 1) continue;

      [caseWB.white.before, caseWB.black.before] = [
        caseWB.black.before,
        caseWB.white.before,
      ];
    }
  }

  return Math.min(caseWB.white.count, caseWB.black.count);
}
