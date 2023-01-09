const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function countTree(N, edge) {
  const parent = Array(N + 1).fill(0);
  const graph = createGraph(N, edge);
  let count = 0;

  const isTree = (start) => {
    let head = 0;
    const queue = [start];
    parent[start] = -1;

    while (queue.length - head) {
      const cur = queue[head++];

      for (let next = 1; next < graph.length; next++) {
        if (graph[cur][next] === 0 || parent[cur] === next) {
          continue;
        }

        if (parent[next] !== 0) {
          return false;
        }

        parent[next] = cur;
        queue.push(next);
      }
    }

    return true;
  };

  for (let start = 1; start < parent.length; start++) {
    if (parent[start] === 0 && isTree(start)) {
      count += 1;
    }
  }

  return count;
}

function createGraph(N, edge) {
  const graph = Array.from(Array(N + 1), () => Array(N + 1).fill(0));
  edge.forEach((row) => {
    const [u, v] = row.trim().split(" ").map(Number);
    graph[u][v] = 1;
    graph[v][u] = 1;
  });
  return graph;
}

let line = 0;
const answer = [];

while (line < input.length - 1) {
  const [n, m] = input[line++].trim().split(" ").map(Number);
  const edge = [];
  while (edge.length < m) {
    edge.push(input[line++]);
  }

  const count = countTree(n, edge);
  answer.push(count);
}

console.log(
  answer
    .map((count, index) => {
      switch (count) {
        case 0:
          return `Case ${index + 1}: No trees.`;
        case 1:
          return `Case ${index + 1}: There is one tree.`;
        default:
          return `Case ${index + 1}: A forest of ${count} trees.`;
      }
    })
    .join("\n")
);
