const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, board) {
  const [R, C] = [0, 1];
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || M <= c;
  const bfs = (startR, startC, visited) => {
    let head = 0;
    const queue = [[startR, startC]];
    const index = board[startR][startC];
    const min = [startR, startC];
    const max = [startR, startC];

    visited[startR][startC] = true;
    while (queue.length - head) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;
        if (board[nr][nc] !== index) continue;
        if (visited[nr][nc]) continue;

        visited[nr][nc] = true;
        queue.push([nr, nc]);

        min[R] = Math.min(min[R], nr);
        min[C] = Math.min(min[C], nc);

        max[R] = Math.max(max[R], nr);
        max[C] = Math.max(max[C], nc);
      }
    }

    return { queue, min, max };
  };
  const isPretty = () => {
    const visited = Array.from(Array(N), () => Array(M).fill(false));

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < M; c++) {
        if (visited[r][c]) continue;
        const { queue, min, max } = bfs(r, c, visited);

        const width = max[R] - min[R] + 1;
        const height = max[C] - min[C] + 1;
        if (width * height !== queue.length) return false;

        const leftTop = [min[R], min[C]];
        const rightTop = [min[R], max[C]];
        const leftBottom = [max[R], min[C]];
        const rightBottom = [min[R], max[C]];
        const vertex = [leftTop, rightTop, leftBottom, rightBottom];

        const isRectangle = vertex.every(([rectR, rectC]) =>
          queue.some(
            ([visitedR, visitedC]) => rectR === visitedR && rectC === visitedC
          )
        );

        if (!isRectangle) return false;
      }
    }

    return true;
  };

  return isPretty() ? "dd" : "BaboBabo";
}

const [N, M] = input.shift().split(" ").map(Number);
console.log(solution(N, M, input));
