const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, coord, edge) {
  const VERTEX_A = 0;
  const VERTEX_B = 1;
  const DISTANCE = 2;

  const parent = Array.from(Array(N + 1), (_, i) => i);
  const rest = [];
  let mst = 0;

  const find = (v) => {
    if (parent[v] === v) return v;
    return (parent[v] = find(parent[v]));
  };
  const union = (vA, vB) => {
    parent[find(vA)] = find(vB);
  };
  const inSameSet = (vA, vB) => {
    return find(vA) === find(vB);
  };
  const calcDistance = (vA, vB) => {
    const X = 0;
    const Y = 1;
    return Math.sqrt(
      (coord[vA][X] - coord[vB][X]) ** 2 + (coord[vA][Y] - coord[vB][Y]) ** 2
    );
  };

  edge.forEach(([vA, vB]) => {
    if (inSameSet(vA, vB)) M -= 1;
    else union(vA, vB);
  });

  for (let vA = 1; vA < N + 1; vA++) {
    for (let vB = vA + 1; vB < N + 1; vB++) {
      if (inSameSet(vA, vB)) continue;
      rest.push([vA, vB, calcDistance(vA, vB)]);
    }
  }
  rest.sort((a, b) => b[DISTANCE] - a[DISTANCE]);

  for (let selected = M; selected < N - 1; selected++) {
    while (inSameSet(rest.at(-1)[VERTEX_A], rest.at(-1)[VERTEX_B])) {
      rest.pop();
    }

    const [X, Y, distance] = rest.pop();
    union(X, Y);
    mst += distance;
  }

  return mst.toFixed(2);
}

const [N, M] = input.shift().split(" ").map(Number);
const coord = [
  [],
  ...input.splice(0, N).map((row) => row.split(" ").map(Number)),
];
const edge = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, M, coord, edge));
