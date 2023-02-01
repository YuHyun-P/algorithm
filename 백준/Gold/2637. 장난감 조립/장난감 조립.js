const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, indegree, graph) {
  const VERTEX = 0;

  let cur = null;
  let head = 0;
  const basic = new Set();
  const queue = [];
  const composition = Array.from(Array(N + 1), () => new Map());

  indegree.forEach((cur, vertex) => {
    if (cur !== 0) return;
    basic.add(vertex);
    queue.push(vertex);
    composition[vertex].set(vertex, 1);
  });

  while (queue.length - head) {
    cur = queue[head++];
    for (const [next, K] of graph[cur]) {
      indegree[next] -= 1;

      for (const [basicY, basicK] of composition[cur].entries()) {
        composition[next].set(
          basicY,
          (composition[next].get(basicY) ?? 0) + basicK * K
        );
      }
      indegree[next] === 0 && queue.push(next);
    }
  }

  return [...composition[cur].entries()]
    .sort((a, b) => a[VERTEX] - b[VERTEX])
    .map((row) => row.join(" "))
    .join("\n");
}

function init(N, edge) {
  const indegree = Array(N + 1).fill(0);
  indegree[0] = Infinity;
  const graph = Array.from(Array(N + 1), () => []);

  edge.forEach((row) => {
    const [X, Y, K] = row.split(" ").map(Number);
    indegree[X] += 1;
    graph[Y].push([X, K]);
  });

  return [indegree, graph];
}

const N = Number(input.shift());
const M = Number(input.shift());
console.log(solution(N, ...init(N, input)));
