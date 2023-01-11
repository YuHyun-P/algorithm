const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, W, graph) {
  const [parent, edge] = init(N, W, graph);
  let mst = 0;

  const find = (node) => {
    return parent[node] === node ? node : (parent[node] = find(parent[node]));
  };
  const union = (nodeA, nodeB) => {
    const parentA = find(nodeA);
    const parentB = find(nodeB);

    if (parentA === parentB) {
      return;
    }

    parent[parentB] = parentA;
  };
  const inSameSet = (nodeA, nodeB) => {
    return find(nodeA) === find(nodeB);
  };

  for (let count = 0; count < N; count++) {
    while (edge.length) {
      const [nodeA, nodeB, weight] = edge.pop();
      if (inSameSet(nodeA, nodeB)) {
        continue;
      }

      mst += weight;
      union(nodeA, nodeB);
      break;
    }
  }

  return mst;
}

function init(N, W, graph) {
  const parent = Array.from(Array(N + 1), (_, index) => index);
  const edge = [];
  for (let nodeA = 0; nodeA < N; nodeA++) {
    for (let nodeB = nodeA + 1; nodeB < N; nodeB++) {
      edge.push([nodeA, nodeB, graph[nodeA][nodeB]]);
    }
    edge.push([nodeA, N, W[nodeA]]);
  }
  edge.sort((a, b) => b[2] - a[2]);
  return [parent, edge];
}

const N = Number(input.shift().trim());
const W = input.splice(0, N).map(Number);
const graph = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, W, graph));
