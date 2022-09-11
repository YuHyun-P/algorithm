let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

/* 입력 */
const [N, M] = input[0].split(" ").map(Number);
const maze = [];
for (let line = 1; line < input.length; line++) {
  maze.push(input[line].split("").map(Number));
}

/* 풀이 */
const ROAD = 1;
const distance = Array.from(Array(N), () => Array(M).fill(Infinity));
const visited = Array.from(Array(N), () => Array(M).fill(false));

const isValidCell = ([r, c]) => 0 <= r && r < N && 0 <= c && c < M;
const isRoad = ([r, c]) => maze[r][c] === ROAD;

const bfs = ([startR, startC]) => {
  // right, down, left, up
  const DIRECTION_NUM = 4;
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  distance[startR][startC] = 1;
  const queue = [[startR, startC]];
  visited[startR][startC] = true;

  while (queue.length > 0) {
    const [curR, curC] = queue.shift();

    for (let i = 0; i < DIRECTION_NUM; i++) {
      const nextR = curR + dr[i];
      const nextC = curC + dc[i];

      if (!isValidCell([nextR, nextC])) continue;
      if (!isRoad([nextR, nextC])) continue;
      if (visited[nextR][nextC]) continue;

      distance[nextR][nextC] = Math.min(
        distance[nextR][nextC],
        distance[curR][curC] + 1
      );
      queue.push([nextR, nextC]);
      visited[nextR][nextC] = true;
    }
  }
};
bfs([0, 0]);

console.log(distance[N - 1][M - 1]);
