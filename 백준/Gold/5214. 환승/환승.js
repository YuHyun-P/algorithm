const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K, M, edges) {
  const PAD = 1;
  const graph = init(N, M, edges);
  const isHyperTube = (vertex) => vertex > N;

  const bfs = (start, target, graph) => {
    let head = 0;
    const queue = [start];
    const distance = Array(N + M + PAD).fill(-1);

    distance[start] = 1;
    while (queue.length - head) {
      const cur = queue[head++];

      for (const next of graph[cur]) {
        if (distance[next] !== -1) continue;

        distance[next] = isHyperTube(next) ? distance[cur] : distance[cur] + 1;

        if (next === target) break;

        queue.push(next);
      }
    }

    return distance[target];
  };

  return bfs(1, N, graph);
}

function init(N, M, edges) {
  const PAD = 1;
  const graph = Array.from(Array(N + M + PAD), () => []);
  edges.forEach((row, offset) => {
    const hyperTube = N + PAD + offset;
    const vertices = row.trim().split(" ").map(Number);
    vertices.forEach((vertex) => {
      graph[hyperTube].push(vertex);
      graph[vertex].push(hyperTube);
    });
  });

  return graph;
}

const [N, K, M] = input.shift().trim().split(" ").map(Number);
console.log(solution(N, K, M, input));
