const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(R, C, board, N, stick) {
  const [ROW, COL] = [0, 1];
  const [EMPTY, MINERAL] = [".", "x"];
  const [LEFT, RIGHT] = [1, -1];
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const outOfBound = (r, c) => r < 0 || c < 0 || R <= r || C <= c;
  const clear = (r, c) => (board[r][c] = EMPTY);
  const bfs = (startR, startC, visited) => {
    let head = 0;
    const queue = [[startR, startC]];

    visited[startR][startC] = true;

    while (queue.length - head) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;
        if (visited[nr][nc]) continue;
        if (board[nr][nc] === EMPTY) continue;

        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }

    return queue;
  };
  const getCluster = (r, c) => {
    const visited = Array.from(Array(R), () => Array(C).fill(false));
    const cluster = [];
    for (const [dr, dc] of direction) {
      const [nr, nc] = [r + dr, c + dc];
      if (outOfBound(nr, nc)) continue;
      if (board[nr][nc] === EMPTY) continue;
      if (visited[nr][nc]) continue;
      cluster.push(bfs(nr, nc, visited));
    }
    return cluster;
  };
  const calcOffset = (cluster) => {
    const offset = Array(C).fill(Infinity);
    cluster.sort((a, b) => b[ROW] - a[ROW] || a[COL] - b[COL]);
    cluster.forEach(([r, c]) => {
      if (offset[c] !== Infinity) return;

      let curR = r + 1;
      while (!outOfBound(curR, c) && board[curR][c] === EMPTY) curR += 1;
      offset[c] = curR - r - 1;
    });

    return Math.min(...offset);
  };
  const drop = (cluster) => {
    const offset = calcOffset(cluster);
    cluster.forEach(([r, c]) => {
      clear(r, c);
      board[r + offset][c] = MINERAL;
    });
  };
  const cut = (height, dc) => {
    const r = R - height;
    let c = dc === LEFT ? 0 : C - 1;
    while (!outOfBound(r, c) && board[r][c] === EMPTY) c += dc;
    if (outOfBound(r, c)) return;

    clear(r, c);
    const clusterArray = getCluster(r, c);
    for (const cluster of clusterArray) {
      const isFloated = !cluster.some(([r]) => r === R - 1);
      if (isFloated) {
        drop(cluster);
        break;
      }
    }
  };

  stick.forEach((height, turn) => cut(height, turn % 2 === 0 ? LEFT : RIGHT));
  return board.map((row) => row.join("")).join("\n");
}

const [R, C] = input.shift().split(" ").map(Number);
const stick = input.pop().split(" ").map(Number);
const N = Number(input.pop());
const board = input.map((row) => row.split(""));
console.log(solution(R, C, board, N, stick));
