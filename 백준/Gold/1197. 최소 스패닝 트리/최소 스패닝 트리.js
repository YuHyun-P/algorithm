const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class UnionFind {
  constructor(vertexList) {
    this.parent = [...vertexList];
  }

  find(vertex) {
    return this.parent[vertex] === vertex
      ? vertex
      : (this.parent[vertex] = this.find(this.parent[vertex]));
  }

  union(vertexA, vertexB) {
    const parentA = this.find(vertexA);
    const parentB = this.find(vertexB);
    if (parentA === parentB) {
      return;
    }

    this.parent[parentB] = parentA;
  }

  inSameSet(vertexA, vertexB) {
    const parentA = this.find(vertexA);
    const parentB = this.find(vertexB);
    return parentA === parentB;
  }
}

function solution(V, E, edge) {
  const unionFind = new UnionFind(
    Array.from(Array(V + 1), (_, index) => index)
  );

  edge.sort((edgeA, edgeB) => edgeB[2] - edgeA[2]);
  let mst = 0;
  for (let count = 0; count < V; count++) {
    while (edge.length) {
      const [u, v, min] = edge.pop();
      if (unionFind.inSameSet(u, v)) {
        continue;
      }

      unionFind.union(u, v);
      mst += min;
      break;
    }
  }

  return mst;
}

const [V, E] = input.shift().trim().split(" ").map(Number);
const edge = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(V, E, edge));
