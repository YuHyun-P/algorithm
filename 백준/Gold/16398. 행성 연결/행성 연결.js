const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, graph) {
  const WEIGHT = 2;
  const edge = init(N, graph);
  let mst = 0;

  const parent = Array.from(Array(N + 1), (_, index) => index);
  const find = (vertex) => {
    if (parent[vertex] === vertex) {
      return vertex;
    }
    return (parent[vertex] = find(parent[vertex]));
  };
  const union = (vertexA, vertexB) => {
    const parentA = find(vertexA);
    const parentB = find(vertexB);
    if (parentA === parentB) {
      return;
    }
    parent[parentB] = parentA;
  };
  const inSameSet = (vertexA, vertexB) => {
    return find(vertexA) === find(vertexB);
  };

  edge.sort((a, b) => b[WEIGHT] - a[WEIGHT]);
  for (let count = 0; count < N - 1; count++) {
    while (edge.length) {
      const [i, j, c] = edge.pop();
      if (inSameSet(i, j)) {
        continue;
      }

      union(i, j);
      mst += c;
      break;
    }
  }

  return mst;
}

function init(N, graph) {
  const edge = [];
  for (let row = 0; row < N; row++) {
    for (let col = row + 1; col < N; col++) {
      edge.push([row, col, graph[row][col]]);
    }
  }
  return edge;
}

const N = Number(input.shift().trim());
const graph = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, graph));
