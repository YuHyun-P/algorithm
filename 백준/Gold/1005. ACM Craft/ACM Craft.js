const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution({ N, process, indegree, graph, W }) {
  let head = 0;
  const queue = [];
  const complete = Array(N + 1).fill(0);

  indegree.forEach((cur, vertex) => {
    if (cur !== 0) return;

    queue.push(vertex);
    complete[vertex] = process[vertex];
  });

  while (queue.length - head) {
    const cur = queue[head++];

    for (const next of graph[cur]) {
      indegree[next] -= 1;
      complete[next] = Math.max(complete[next], complete[cur] + process[next]);
      if (indegree[next] === 0) queue.push(next);
    }
  }

  return complete[W];
}

let cursor = 0;
const T = Number(input[cursor++]);
for (let tc = 0; tc < T; tc++) {
  const [N, K] = input[cursor++].split(" ").map(Number);
  const process = [Infinity, ...input[cursor++].split(" ").map(Number)];
  const indegree = Array(N + 1).fill(0);
  const graph = Array.from(Array(N + 1), () => []);

  indegree[0] = Infinity;
  for (let edge = 0; edge < K; edge++) {
    const [X, Y] = input[cursor++].split(" ").map(Number);
    indegree[Y] += 1;
    graph[X].push(Y);
  }

  const W = Number(input[cursor++]);
  console.log(solution({ N, process, indegree, graph, W }));
}
