const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(w, h, room) {
  const [CLEAN, BLOCK, DIRTY, CLEANER] = [".", "x", "*", "o"];

  let dp;
  let graph;
  const node = [];
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const outOfBound = (r, c) => r < 0 || c < 0 || h <= r || w <= c;
  const bfs = (startR, startC) => {
    let head = 0;
    const queue = [[startR, startC]];
    const distance = Array.from(Array(h), () => Array(w).fill(Infinity));
    distance[startR][startC] = 0;

    while (queue.length - head) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;
        if (room[nr][nc] === BLOCK) continue;
        if (distance[nr][nc] !== Infinity) continue;

        distance[nr][nc] = distance[r][c] + 1;
        queue.push([nr, nc]);
      }
    }

    return distance;
  };
  const dfs = (cur, visited) => {
    if (visited === (1 << node.length) - 1) return 0;
    if (dp[cur][visited] !== -1) return dp[cur][visited];

    let tmp = Infinity;
    for (let next = 1; next < node.length; next++) {
      if ((visited & (1 << next)) !== 0) continue;
      const min = graph[cur][next] + dfs(next, visited ^ (1 << next));
      tmp = Math.min(tmp, min);
    }

    dp[cur][visited] = tmp;
    return tmp;
  };

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (room[r][c] === DIRTY) node.push([r, c]);
      if (room[r][c] === CLEANER) node.unshift([r, c]);
    }
  }

  dp = Array.from(Array(node.length), () => Array(2 << node.length).fill(-1));
  graph = Array.from(Array(node.length), () => Array(node.length).fill(0));
  node.forEach(([srcR, srcC], i) => {
    const distance = bfs(srcR, srcC);
    node.forEach(([destR, destC], j) => {
      if (i === j) return;
      if (graph[i][j] !== 0) return;
      graph[i][j] = distance[destR][destC];
      graph[j][i] = distance[destR][destC];
    });
  });

  const min = dfs(0, 1 << 0);
  return min === Infinity ? -1 : min;
}

let cursor = 0;
const answer = [];
while (input[cursor] !== "0 0") {
  const [w, h] = input[cursor++].split(" ").map(Number);
  const room = input.slice(cursor, cursor + h);
  cursor += h;

  answer.push(solution(w, h, room));
}

console.log(answer.join("\n"));
