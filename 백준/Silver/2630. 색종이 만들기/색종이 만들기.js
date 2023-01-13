const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, board) {
  const count = [0, 0];
  const check = (startRow, startCol, length) => {
    for (let row = 0; row < length; row++) {
      for (let col = 0; col < length; col++) {
        if (
          board[startRow][startCol] !== board[startRow + row][startCol + col]
        ) {
          return false;
        }
      }
    }
    return true;
  };
  const traverse = (startRow, startCol, length) => {
    if (length === 1 || check(startRow, startCol, length)) {
      count[board[startRow][startCol]] += 1;
      return;
    }

    for (let row = 0; row < length; row += length / 2) {
      for (let col = 0; col < length; col += length / 2) {
        traverse(startRow + row, startCol + col, length / 2);
      }
    }
  };

  traverse(0, 0, N);
  return count.join("\n");
}

const N = Number(input.shift().trim());
const board = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, board));
