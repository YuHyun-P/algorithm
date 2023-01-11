const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, edge) {
  const DIVISION = 1;
  const WEIGHT = 2;
  let mst = 0;

  const parent = Array.from(Array(N + 1), (_, index) => index);
  const find = (vertex) => {
    if (parent[vertex] === vertex) {
      return vertex;
    }
    return (parent[vertex] = find(parent[vertex]));
  };
  const union = (vertexA, vertexB) => {
    parent[find(vertexB)] = find(vertexA);
  };
  const inSameSet = (vertexA, vertexB) => {
    return find(vertexA) === find(vertexB);
  };

  edge.sort((a, b) => b[WEIGHT] - a[WEIGHT]);
  for (let count = 0; count < N - 1 - DIVISION; count++) {
    while (edge.length) {
      const [A, B, C] = edge.pop();
      if (inSameSet(A, B)) {
        continue;
      }

      union(A, B);
      mst += C;
      break;
    }
  }

  return mst;
}

const [N, M] = input.shift().split(" ").map(Number);
const edge = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, edge));
