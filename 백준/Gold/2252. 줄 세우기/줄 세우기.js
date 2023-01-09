const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, edge) {
  const path = [];
  const inDegree = Array(N + 1).fill(0);
  const graph = Array.from(Array(N + 1), () => []);
  inDegree[0] = Infinity;
  edge.forEach((row) => {
    const [u, v] = row.trim().split(" ").map(Number);
    inDegree[v] += 1;
    graph[u].push(v);
  });

  const topologySort = () => {
    let head = 0;
    const queue = [];
    inDegree.forEach((num, node) => {
      if (num === 0) {
        queue.push(node);
      }
    });

    while (queue.length - head) {
      const cur = queue[head++];
      path.push(cur);

      for (const next of graph[cur]) {
        if (inDegree[next] === 1) {
          queue.push(next);
        }
        inDegree[next] = Math.max(0, inDegree[next] - 1);
      }
    }
  };

  topologySort();
  return path;
}
const [N, M] = input.shift().split(" ").map(Number);
console.log(solution(N, M, input).join(" "));
