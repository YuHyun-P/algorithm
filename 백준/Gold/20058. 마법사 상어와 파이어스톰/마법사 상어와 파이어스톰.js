const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, Q, ice, L) {
  N = 2 ** N;
  const LIMIT = 3;
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  const visited = Array.from(Array(N), () => Array(N).fill(false));

  let total = 0;
  let max = 0;

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || N <= c;
  const melt = () => {
    const next = ice.map((row) => [...row]);

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (ice[r][c] === 0) continue;

        let adjacent = 0;
        for (let dir = 0; dir < dr.length; dir++) {
          const adjRow = r + dr[dir];
          const adjCol = c + dc[dir];
          if (outOfBound(adjRow, adjCol)) continue;
          if (ice[adjRow][adjCol] === 0) continue;

          adjacent += 1;
        }

        if (adjacent < LIMIT) next[r][c] -= 1;
      }
    }

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (ice[r][c] !== next[r][c]) {
          ice[r][c] = next[r][c];
        }
      }
    }
  };
  const rotate = (r, c, size) => {
    const rotated = Array.from(Array(size), () => Array(size).fill(0));
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        rotated[col][size - row - 1] = ice[row + r][col + c];
      }
    }
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        ice[row + r][col + c] = rotated[row][col];
      }
    }
  };
  const firestorm = (l) => {
    const size = 2 ** l;
    for (let r = 0; r < N; r += size) {
      for (let c = 0; c < N; c += size) {
        rotate(r, c, size);
      }
    }

    melt();
  };
  const bfs = (startR, startC) => {
    let total = 0;
    let count = 0;
    let head = 0;
    const queue = [[startR, startC]];

    visited[startR][startC] = true;
    total += ice[startR][startC];
    count += 1;

    while (queue.length - head) {
      const [curRow, curCol] = queue[head++];

      for (let dir = 0; dir < dr.length; dir++) {
        const nextRow = curRow + dr[dir];
        const nextCol = curCol + dc[dir];

        if (outOfBound(nextRow, nextCol)) continue;
        if (visited[nextRow][nextCol]) continue;
        if (ice[nextRow][nextCol] === 0) continue;

        visited[nextRow][nextCol] = true;
        total += ice[nextRow][nextCol];
        count += 1;
        queue.push([nextRow, nextCol]);
      }
    }

    return [total, count];
  };

  L.forEach((l) => firestorm(l));

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (visited[r][c]) continue;
      if (ice[r][c] === 0) continue;
      const [curTotal, curCount] = bfs(r, c);
      total += curTotal;
      max = Math.max(max, curCount);
    }
  }

  return `${total}\n${max}`;
}

const [N, Q] = input.shift().trim().split(" ").map(Number);
const L = input.pop().trim().split(" ").map(Number);
const ice = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, Q, ice, L));
