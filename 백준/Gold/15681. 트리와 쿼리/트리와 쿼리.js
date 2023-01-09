const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, root, graph, query) {
  const subtreeSize = Array(N + 1).fill(1);

  const dfs = (cur, parent) => {
    for (const child of graph[cur]) {
      if (child === parent) {
        continue;
      }

      dfs(child, cur);
      subtreeSize[cur] += subtreeSize[child];
    }
  };
  dfs(root, -1);

  return query.map((char) => subtreeSize[Number(char)]);
}

const [N, R, Q] = input.shift().trim().split(" ").map(Number);
const graph = Array.from(Array(N + 1), () => []);
for (let line = 0; line < N - 1; line++) {
  const [u, v] = input[line].trim().split(" ").map(Number);
  graph[v].push(u);
  graph[u].push(v);
}
console.log(solution(N, R, graph, input.slice(N - 1)).join("\n"));
