const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const EMPTY = 0;
const WALL = 1;
const VIRUS = 2;

const graph = Array.from(Array(N), () => []);
const empty = [];
const virus = [];

const isValid = (r, c) => 0 <= r && r < N && 0 <= c && c < M;

for (let line = 1; line < N + 1; line++) {
  input[line]
    .trim()
    .split(" ")
    .map(Number)
    .forEach((cell, col) => {
      graph[line - 1].push(cell);

      cell === EMPTY && empty.push([line - 1, col]);
      cell === VIRUS && virus.push([line - 1, col]);
    });
}

const permutations = [];
for (let one = 0; one < empty.length - 2; one++) {
  for (let two = one + 1; two < empty.length - 1; two++) {
    for (let three = two + 1; three < empty.length; three++) {
      permutations.push([one, two, three]);
    }
  }
}

const bfs = (limit) => {
  const DIRECTION = 4;
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  const visited = Array.from(Array(N), () => Array(M).fill(false));
  const queue = [...virus];
  queue.forEach(([virusR, virusC]) => {
    visited[virusR][virusC] = true;
  });
  let virusCount = queue.length;

  while (queue.length) {
    if (virusCount >= limit) break;

    const [curR, curC] = queue.shift();

    for (let i = 0; i < DIRECTION; i++) {
      const nextR = curR + dr[i];
      const nextC = curC + dc[i];

      if (
        isValid(nextR, nextC) &&
        !visited[nextR][nextC] &&
        graph[nextR][nextC] !== WALL
      ) {
        visited[nextR][nextC] = true;
        virusCount++;
        queue.push([nextR, nextC]);
      }
    }
  }

  return virusCount;
};

let minVirus = Infinity;
permutations.forEach((WallIndices) => {
  WallIndices.forEach((index) => {
    const [r, c] = empty[index];
    graph[r][c] = WALL;
  });

  const virusCount = bfs(minVirus);
  minVirus = Math.min(virusCount, minVirus);

  WallIndices.forEach((index) => {
    const [r, c] = empty[index];
    graph[r][c] = EMPTY;
  });
});

console.log(empty.length - minVirus - 3 + virus.length);
