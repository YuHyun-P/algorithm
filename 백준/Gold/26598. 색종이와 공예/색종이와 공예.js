const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, board) {
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const visited = Array.from(Array(N), () => Array(M).fill(false));

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || M <= c;
  const bfs = (startR, startC, visited) => {
    let [minR, minC] = [startR, startC];
    let [maxR, maxC] = [startR, startC];

    let head = 0;
    const queue = [[startR, startC]];
    const color = board[startR][startC];

    visited[startR][startC] = true;

    while (queue.length - head) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;
        if (visited[nr][nc]) continue;
        if (board[nr][nc] !== color) continue;

        visited[nr][nc] = true;
        minR = Math.min(minR, nr);
        maxR = Math.max(maxR, nr);
        minC = Math.min(minC, nc);
        maxC = Math.max(maxC, nc);
        queue.push([nr, nc]);
      }
    }

    return [[minR, minC, maxR, maxC], queue];
  };

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (visited[r][c]) continue;
      const [[minR, minC, maxR, maxC], queue] = bfs(r, c, visited);
      const [width, height] = [maxC - minC + 1, maxR - minR + 1];
      const nBoundary =
        width * height -
        (width <= 2 || height <= 2 ? 0 : (width - 2) * (height - 2));

      if (queue.length !== width * height) return "BaboBabo";
      if (
        queue.filter(
          ([r, c]) => r === minR || r === maxR || c === minC || c === maxC
        ).length !== nBoundary
      )
        return "BaboBabo";
    }
  }

  return "dd";
}

const [N, M] = input.shift().split(" ").map(Number);
console.log(solution(N, M, input));
