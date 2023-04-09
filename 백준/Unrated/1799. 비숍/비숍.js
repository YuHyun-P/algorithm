const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, board) {
  const [EMPTY, BLOCK] = ["1", "0"];

  const bishop = Array.from(Array(2 * N), () => []);
  const visited = Array(2 * N).fill(false);

  const dfs = (diagonal, bishop) => {
    if (diagonal >= 2 * N) return 0;

    let max = 0;
    max = dfs(diagonal + 2, bishop);

    for (let r = Math.max(0, diagonal - N + 1); r < N; r++) {
      const c = diagonal - r;
      if (c < 0) break;
      if (board[r][c] !== EMPTY) continue;

      const index = c - r + N - 1;
      if (visited[index]) continue;

      visited[index] = true;
      max = Math.max(dfs(diagonal + 2, bishop) + 1, max);
      visited[index] = false;
    }

    return max;
  };

  return dfs(0, bishop) + dfs(1, bishop);
}

const N = Number(input.shift());
const board = input.map((row) => row.trim().split(" "));
console.log(solution(N, board));
