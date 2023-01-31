const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, graph) {
  const visited = Array(N + 1).fill(false);
  let connectedComponent = 0;

  const bfs = (start) => {
    let head = 0;
    const queue = [start];
    visited[start] = true;

    while (queue.length - head) {
      const cur = queue[head++];
      for (const next of graph[cur]) {
        if (visited[next]) continue;

        visited[next] = true;
        queue.push(next);
      }
    }
  };

  for (let v = 1; v < N + 1; v++) {
    if (visited[v]) continue;
    bfs(v);
    connectedComponent += 1;
  }

  const add = Math.max(connectedComponent - 1, 0);
  const remove = Math.abs(N - 1 - M - add);
  return add + remove;
}

function init(N, edge) {
  const graph = Array.from(Array(N + 1), () => []);
  edge.forEach((row) => {
    const [u, v] = row.split(" ").map(Number);
    graph[u].push(v);
    graph[v].push(u);
  });
  return graph;
}

const [N, M] = input.shift().split(" ").map(Number);
const graph = init(N, input);
console.log(solution(N, M, graph));
