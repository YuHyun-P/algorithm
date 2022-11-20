const fs = require("fs");
const N = Number(fs.readFileSync("/dev/stdin").toString().trim());

const board = Array.from(Array(N), () => Array(N).fill(false));
divideDraw([0, 0], N);
console.log(
  board.map((row) => row.map((col) => (col ? "*" : " ")).join("")).join("\n")
);

function divideDraw(startPos, size) {
  if (size === 1) return;

  const [startRow, startCol] = startPos;
  if (size > 3) {
    for (let row = 0; row < size; row += size / 3) {
      for (let col = 0; col < size; col += size / 3) {
        if (row === size / 3 && col === size / 3) continue;

        divideDraw([startRow + row, startCol + col], size / 3);
      }
    }
  } else {
    drawStar(board, startRow, startCol, size);
  }
}

function drawStar(board, startRow, startCol, size) {
  for (let col = startCol; col < startCol + size; col++) {
    board[startRow][col] = board[startRow + size - 1][col] = true;
  }

  for (let row = startRow + 1; row < startRow + size - 1; row++) {
    board[row][startCol] = board[row][startCol + size - 1] = true;
  }
}
