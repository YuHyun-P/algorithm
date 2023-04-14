const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, board) {
  const [EMPTY, BLOCK] = [1, 0];

  const visited = Array(2 * N).fill(false);
  const dfs = (level) => {
    if (level > 2 * (N - 1)) return 0;

    let max = dfs(level + 2);
    let r = level < N ? 0 : level - N + 1;
    for (; r < N && 0 <= level - r; r++) {
      const c = level - r;
      const intercept = c - r + N;
      if (board[r][c] !== EMPTY) continue;
      if (visited[intercept]) continue;

      placed = true;
      visited[intercept] = true;
      max = Math.max(max, dfs(level + 2) + 1);
      visited[intercept] = false;
    }

    return max;
  };

  return dfs(0) + dfs(1);
}

const N = Number(input.shift());
const board = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, board));
