const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, board) {
  const LIMIT = 5;
  let max = 0;

  const rotate = (board) => {
    const rotated = Array.from(Array(N), () => Array(N).fill(0));
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        rotated[col][N - 1 - row] = board[row][col];
      }
    }

    for (let row = 0; row < N; row++) {
      board[row] = rotated[row];
    }
  };
  const tilt = (board) => {
    for (let row = 0; row < N; row++) {
      const tilted = Array(N).fill(0);
      let tiltedCol = N - 1;

      for (let col = N - 1; 0 <= col; col--) {
        if (board[row][col] === 0) {
          continue;
        }

        if (board[row][col] === tilted[tiltedCol]) {
          tilted[tiltedCol] *= 2;
          tiltedCol -= 1;
          continue;
        }

        if (tilted[tiltedCol]) {
          tiltedCol -= 1;
        }

        tilted[tiltedCol] = board[row][col];
      }

      board[row] = tilted;
    }
  };

  for (let path = 0; path < 4 ** LIMIT; path++) {
    let curBoard = board.map((row) => [...row]);
    let curPath = path;

    for (let iter = 0; iter < LIMIT; iter++) {
      const direction = curPath % 4;
      curPath = Math.floor(curPath / 4);

      for (let rotateIter = direction; rotateIter > 0; rotateIter--) {
        rotate(curBoard);
      }

      tilt(curBoard);
    }

    max = Math.max(max, ...curBoard.flat());
  }
  return max;
}

const N = Number(input.shift());
const board = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, board));
