const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, edges) {
  const graph = init(N, edges);

  const visited = Array(N + 1).fill(false);
  visited[1] = true;

  const dp = Array.from(Array(N + 1), () => [-1, -1]);

  const dfs = (cur, filled) => {
    let children = 0;

    if (dp[cur][filled ? 1 : 0] !== -1) {
      return dp[cur][filled ? 1 : 0];
    }

    for (const next of graph[cur]) {
      if (visited[next]) continue;

      visited[next] = true;
      let child = dfs(next, !filled);
      visited[next] = false;

      if (filled) {
        visited[next] = true;
        child = Math.min(child, dfs(next, filled));
        visited[next] = false;
      }

      children += child;
    }

    dp[cur][filled ? 1 : 0] = children + (filled ? 1 : 0);
    return children + (filled ? 1 : 0);
  };

  const fillStart = dfs(1, true);
  const unFillStart = dfs(1, false);

  return Math.min(fillStart, unFillStart);
}

function init(N, edges) {
  const PAD = 1;
  const graph = Array.from(Array(N + PAD), () => []);
  edges.forEach((row) => {
    const [u, v] = row.trim().split(" ").map(Number);
    graph[u].push(v);
    graph[v].push(u);
  });
  return graph;
}

const N = Number(input.shift().trim());
console.log(solution(N, input));
