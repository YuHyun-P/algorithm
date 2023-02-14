const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(M, N, board) {
  const BLACK = 1;

  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  const visited = Array.from(Array(M), () => Array(N).fill(false));

  const outOfBound = (r, c) => r < 0 || c < 0 || M <= r || N <= c;
  const bfs = (r, c) => {
    let head = 0;
    const queue = [[r, c]];
    visited[r][c] = true;

    while (queue.length - head) {
      const [curR, curC] = queue[head++];

      for (let dir = 0; dir < dr.length; dir++) {
        const nextR = curR + dr[dir];
        const nextC = curC + dc[dir];

        if (outOfBound(nextR, nextC)) continue;
        if (visited[nextR][nextC]) continue;
        if (board[nextR][nextC] === BLACK) continue;

        visited[nextR][nextC] = true;
        queue.push([nextR, nextC]);
      }
    }
  };

  for (let c = 0; c < N; c++) {
    if (board[0][c] === BLACK) continue;
    if (visited[0][c]) continue;
    bfs(0, c);
  }

  return visited[M - 1].every((percolate) => percolate === false)
    ? "NO"
    : "YES";
}

const [M, N] = input.shift().trim().split(" ").map(Number);
const board = input.map((row) => row.trim().split("").map(Number));
console.log(solution(M, N, board));
