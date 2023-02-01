const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, K, self, edge) {
  const WEIGHT = 2;
  const parent = Array.from(Array(N + 1), (_, i) => i);
  let mst = 0;

  const find = (v) => {
    if (parent[v] === v) return v;
    return (parent[v] = find(parent[v]));
  };
  const union = (vA, vB) => {
    const pA = find(vA);
    const pB = find(vB);
    if (self.has(pA)) parent[pB] = pA;
    else if (self.has(pB)) parent[pA] = pB;
    else parent[pA] = pB;
  };
  const inSameSet = (vA, vB) => {
    return find(vA) === find(vB);
  };

  edge.sort((a, b) => b[WEIGHT] - a[WEIGHT]);
  for (let selected = 0; selected < N - self.size; selected++) {
    while (edge.length) {
      const [vA, vB] = edge.at(-1);
      const pA = find(vA);
      const pB = find(vB);
      if (self.has(pA) && self.has(pB)) edge.pop();
      else if (inSameSet(pA, pB)) edge.pop();
      else break;
    }

    const [vA, vB, w] = edge.pop();
    union(vA, vB);
    mst += w;
  }

  return mst;
}

const [N, M, K] = input.shift().split(" ").map(Number);
const self = new Set(input.shift().split(" ").map(Number));
const edge = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, M, K, self, edge));
