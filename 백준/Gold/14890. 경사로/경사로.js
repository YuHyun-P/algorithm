const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, L, board) {
  let last = null;
  let len = 0;
  let isDownHill = false;
  let count = 0;

  const init = (num) => {
    last = num;
    len = 1;
    isDownHill = false;
  };

  for (let dir = 0; dir < 2; dir++) {
    for (let r = 0; r < N; r++) {
      init(dir === 0 ? board[r][0] : board[0][r]);
      for (let c = 1; c < N; c++) {
        const cur = dir === 0 ? board[r][c] : board[c][r];
        const diff = cur - last;

        if (Math.abs(diff) > 1) break;
        if (isDownHill && Math.abs(diff) !== 0) break;
        if (diff === 1 && len < L) break;

        if (diff === 0) len += 1;
        if (diff === 1) {
          last = cur;
          len = 1;
        }
        if (diff === -1) {
          last = cur;
          len = 1;
          isDownHill = true;
        }
        if (isDownHill && len === L) {
          isDownHill = false;
          len = 0;
        }

        if (c === N - 1 && !isDownHill) count += 1;
      }
    }
  }

  return count;
}

const [N, L] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, L, board));
