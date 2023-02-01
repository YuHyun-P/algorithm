const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(V, distance) {
  let min = Infinity;

  for (let via = 1; via < V + 1; via++) {
    for (let start = 1; start < V + 1; start++) {
      for (let end = 1; end < V + 1; end++) {
        distance[start][end] = Math.min(
          distance[start][end],
          distance[start][via] + distance[via][end]
        );
      }
    }
  }
  for (let v = 1; v < V + 1; v++) {
    min = Math.min(min, distance[v][v]);
  }

  return min !== Infinity ? min : -1;
}

function init(V, edge) {
  const distance = Array.from(Array(V + 1), () => Array(V + 1).fill(Infinity));
  edge.forEach((row) => {
    const [a, b, c] = row.split(" ").map(Number);
    distance[a][b] = c;
  });
  return distance;
}

const [V, E] = input.shift().split(" ").map(Number);
console.log(solution(V, init(V, input)));
