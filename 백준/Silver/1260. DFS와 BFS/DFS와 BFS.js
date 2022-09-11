let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

/* 입력 */
const [N, M, V] = input[0].split(" ").map((str) => parseInt(str, 10));
const edges = [];
for (let i = 1; i < input.length; i++) {
  const edge = input[i].split(" ").map((str) => parseInt(str, 10));
  edges.push(edge);
}

/* 풀이 */
const graph = Array.from(Array(N + 1), () => []);
edges.forEach(([u, v]) => {
  graph[u].push(v);
  graph[v].push(u);
});
graph.forEach((edge) => edge.sort((a, b) => a - b));

const dfsPath = [];
const dfs = (start) => {
  const visited = Array(N + 1).fill(false);
  visited[0] = visited[start] = true;
  dfsPath.push(start);

  const stack = [start];

  while (stack.length > 0) {
    const cur = stack.pop();

    const nextVertices = graph[cur].filter((vertex) => !visited[vertex]);
    if (nextVertices.length > 1) {
      stack.push(cur);
    }

    if (nextVertices.length > 0) {
      const next = nextVertices[0];
      stack.push(next);
      dfsPath.push(next);
      visited[next] = true;
    }
  }
};
dfs(V);

const bfsPath = [];
const bfs = (start) => {
  const visited = Array(N + 1).fill(false);
  visited[0] = visited[start] = true;

  const queue = [start];

  while (queue.length > 0) {
    const cur = queue.shift();
    bfsPath.push(cur);

    graph[cur].forEach((vertex) => {
      if (visited[vertex]) return;

      queue.push(vertex);
      visited[vertex] = true;
    });
  }
};
bfs(V);

console.log(dfsPath.join(" "));
console.log(bfsPath.join(" "));
