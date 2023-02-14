const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, K, map) {
  const BOTTOM = 5;

  const north = [4, 0, 2, 3, 5, 1];
  const east = [3, 1, 0, 5, 4, 2];
  const south = [1, 5, 2, 3, 0, 4];
  const west = [2, 1, 5, 0, 4, 3];

  const rollIndex = [east, south, west, north];
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  const roll = (dir) => {
    const prev = [...dice];
    rollIndex[dir].forEach((i, j) => (dice[j] = prev[i]));
  };
  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || M <= c;
  const updateDir = (dir, offset) => (dir + offset + dr.length) % dr.length;

  let dir = 0;
  let row = 0;
  let col = 0;
  let t = 0;
  let total = 0;

  const dice = [1, 2, 3, 4, 5, 6];
  const countMap = count(N, M, map);

  while (t < K) {
    let nextRow = row + dr[dir];
    let nextCol = col + dc[dir];
    if (outOfBound(nextRow, nextCol)) {
      dir = updateDir(dir, 2);
      nextRow = row + dr[dir];
      nextCol = col + dc[dir];
    }

    roll(dir);

    const A = dice[BOTTOM];
    const B = map[nextRow][nextCol];
    total += B * countMap[nextRow][nextCol];

    dir = updateDir(dir, Math.sign(A - B));
    row = nextRow;
    col = nextCol;

    t += 1;
  }

  return total;
}

function count(N, M, map) {
  const countMap = Array.from(Array(N), () => Array(M).fill(0));
  const visited = Array.from(Array(N), () => Array(M).fill(false));
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || M <= c;
  const update = (startR, startC) => {
    let head = 0;
    const queue = [[startR, startC]];
    const target = map[startR][startC];

    visited[startR][startC] = true;

    while (queue.length - head) {
      const [curRow, curCol] = queue[head++];
      for (let dir = 0; dir < dr.length; dir++) {
        const nextRow = curRow + dr[dir];
        const nextCol = curCol + dc[dir];

        if (outOfBound(nextRow, nextCol)) continue;
        if (visited[nextRow][nextCol]) continue;
        if (map[nextRow][nextCol] !== target) continue;

        visited[nextRow][nextCol] = true;
        queue.push([nextRow, nextCol]);
      }
    }

    queue.forEach(
      ([row, col], _, queue) => (countMap[row][col] = queue.length)
    );
  };

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (visited[r][c]) continue;
      update(r, c);
    }
  }

  return countMap;
}

const [N, M, K] = input.shift().trim().split(" ").map(Number);
const map = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, M, K, map));
