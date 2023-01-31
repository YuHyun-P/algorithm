const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, edge) {
  const graph = init(N, edge);
  const light = Array(N + 1).fill(0);
  const heavy = Array(N + 1).fill(0);
  let notInMiddle = 0;

  const bfs = (start) => {
    let head = 0;
    const queue = [start];
    const visited = Array(N + 1).fill(false);
    visited[start] = true;

    while (queue.length - head) {
      const cur = queue[head++];

      for (const next of graph[cur]) {
        if (visited[next]) continue;

        visited[next] = true;
        heavy[next] += 1;
        light[start] += 1;
        queue.push(next);
      }
    }
  };

  for (let i = 1; i < N + 1; i++) bfs(i);

  for (let i = 1; i < N + 1; i++) {
    if (heavy[i] >= (N + 1) / 2) notInMiddle += 1;
    if (light[i] >= (N + 1) / 2) notInMiddle += 1;
  }

  return notInMiddle;
}

function init(N, edge) {
  const graph = Array.from(Array(N + 1), () => []);
  edge.forEach((row) => {
    const [u, v] = row.split(" ").map(Number);
    graph[u].push(v);
  });

  return graph;
}

const [N, M] = input.shift().trim().split(" ").map(Number);
console.log(solution(N, M, input));
