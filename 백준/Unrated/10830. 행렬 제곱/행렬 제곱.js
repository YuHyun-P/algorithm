const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, B, board) {
  let answer = board.map((row) => row.map((col) => col % 1000));
  const dp = Array(Math.ceil(Math.log2(B) + 1)).fill(null);
  dp[0] = board;

  const multiply = (boardA, boardB) => {
    const next = Array.from(Array(N), () => Array(N).fill(0));

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        next[r][c] =
          boardA[r].reduce((acc, cur, i) => acc + cur * boardB[i][c], 0) % 1000;
      }
    }

    return next;
  };

  let level = 0;
  while (2 ** (level + 1) < B) {
    const next = multiply(dp[level], dp[level]);
    dp[level + 1] = next;
    answer = next;
    level += 1;
  }

  let cur = 2 ** level;
  while (cur < B) {
    const diffLevel = Math.floor(Math.log2(B - cur));
    const next = multiply(answer, dp[diffLevel]);
    answer = next;
    cur += 2 ** diffLevel;
  }

  return answer.map((row) => row.join(" ")).join("\n");
}

const [N, B] = input.shift().trim().split(" ").map(Number);
const board = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, B, board));
