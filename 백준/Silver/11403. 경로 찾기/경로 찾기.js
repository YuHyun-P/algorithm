const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const N = Number(input.shift().trim());
const graph = input.map((line) => line.trim().split(" ").map(Number));

const hasPath = Array.from(Array(N), () => Array(N).fill(0));

const bfs = (start) => {
  const stack = graph[start]
    .map((_, vertex) => vertex)
    .filter((vertex) => graph[start][vertex] === 1);
  const visited = Array(N).fill(false);
  stack.forEach((vertex) => {
    visited[vertex] = true;
    hasPath[start][vertex] = true;
  });

  while (stack.length) {
    const vertex = stack.pop();
    hasPath[start][vertex] = 1;

    graph[vertex].forEach((edge, next) => {
      if (edge === 1 && !visited[next]) {
        hasPath[start][next] = 1;
        visited[next] = true;
        stack.push(next);
      }
    });
  }
};
graph.forEach((_, rowIndex) => bfs(rowIndex));
console.log(hasPath.map((row) => row.join(" ")).join("\n"));
