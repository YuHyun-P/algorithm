const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, edge, query) {
  const graph = Array.from(Array(N + 1), () => []);
  edge.forEach((row) => {
    const [u, v, w] = row.trim().split(" ").map(Number);
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  });
  const parent = Array(N + 1).fill(0);
  const distance = Array(N + 1).fill(0);

  const dfs = (cur, prev) => {
    for (const [next, weight] of graph[cur]) {
      if (next === prev) {
        continue;
      }

      distance[next] = distance[cur] + weight;
      parent[next] = cur;
      dfs(next, cur);
    }
  };
  dfs(1, 0);

  const getDistance = ([start, end]) => {
    const visited = Array(N + 1).fill(false);
    let cur = start;
    while (cur !== 0) {
      visited[cur] = true;
      cur = parent[cur];
    }

    cur = end;
    while (cur !== 0) {
      if (visited[cur]) {
        break;
      }
      visited[cur] = true;
      cur = parent[cur];
    }

    return distance[start] + distance[end] - distance[cur] * 2;
  };

  return query.map((row) => getDistance(row.trim().split(" ").map(Number)));
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const edge = input.splice(0, N - 1);
console.log(solution(N, edge, input).join("\n"));
