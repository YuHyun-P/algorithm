/* 입력 */
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const T = parseInt(input[0], 10);

/* 풀이 */
const answer = [];

let line = 1;
for (let testCase = 0; testCase < T; testCase++) {
  const [M, N, K] = input[line].trim().split(" ").map(Number);
  const cabbageField = createGraph(M, N, K);
  const count = getConnectedComponentCount(M, N, cabbageField);
  answer.push(count);

  line += K + 1;
}

/* 출력 */
answer.forEach((count) => console.log(count));

function createGraph(M, N, K) {
  const graph = Array.from(Array(N), () => Array(M).fill(false));
  for (let k = 1; k <= K; k++) {
    const [c, r] = input[line + k].trim().split(" ").map(Number);
    graph[r][c] = true;
  }

  return graph;
}

function getConnectedComponentCount(M, N, graph) {
  const DIRECTION = 4;
  // right down left up
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  let count = 0;
  const visited = Array.from(Array(N), () => Array(M).fill(false));

  const isValid = (r, c) => 0 <= r && r < N && 0 <= c && c < M;

  graph.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (visited[r][c] || !cell) return;

      const queue = [[r, c]];
      visited[r][c] = true;
      count++;

      while (queue.length > 0) {
        const [curR, curC] = queue.pop();

        for (let index = 0; index < DIRECTION; index++) {
          const nextR = curR + dr[index];
          const nextC = curC + dc[index];

          const isConnected =
            isValid(nextR, nextC) &&
            graph[nextR][nextC] &&
            !visited[nextR][nextC];
          if (!isConnected) continue;

          queue.push([nextR, nextC]);
          visited[nextR][nextC] = true;
        }
      }
    });
  });

  return count;
}
