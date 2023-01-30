const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, edge) {
  const PADDING = 1;
  const MAX = 2;
  const graph = init(N, edge);
  const distance = Array(N + 1).fill(0);
  let count = 0;

  const bfs = (start) => {
    let head = 0;
    const queue = [start];
    distance[start] = PADDING;

    while (queue.length - head) {
      const cur = queue[head++];
      if (distance[cur] >= MAX + PADDING) continue;

      for (const next of graph[cur]) {
        if (distance[next] > 0) continue;

        distance[next] = distance[cur] + 1;
        count += 1;
        queue.push(next);
      }
    }
  };

  bfs(1);
  return count;
}

function init(N, edge) {
  const graph = Array.from(Array(N + 1), () => []);
  edge.forEach((row) => {
    const [a, b] = row.trim().split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
  });
  return graph;
}

const [N, M] = input.splice(0, 2).map(Number);
console.log(solution(N, M, input));
