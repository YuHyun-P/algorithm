const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const V = Number(input.shift().trim());
const graph = Array.from(Array(V + 1), () => []);
input.forEach((line) => {
  const [vertexA, ...connected] = line.trim().split(" ").map(Number);

  for (let edge = 0; edge < connected.length - 1; edge += 2) {
    const [vertexB, distance] = [connected[edge], connected[edge + 1]];
    graph[vertexA].push([vertexB, distance]);
  }
});

let maxTreeDiameter = 0;
let end = 0;
const dfs = (vertex, path, visited) => {
  if (path > maxTreeDiameter) {
    maxTreeDiameter = path;
    end = vertex;
  }
  visited[vertex] = true;

  graph[vertex].forEach(([nextVertex, distance]) => {
    if (visited[nextVertex]) {
      return;
    }

    dfs(nextVertex, path + distance, visited);
  });
};

dfs(1, 0, Array(V + 1).fill(false));
dfs(end, 0, Array(V + 1).fill(false));
console.log(maxTreeDiameter);
