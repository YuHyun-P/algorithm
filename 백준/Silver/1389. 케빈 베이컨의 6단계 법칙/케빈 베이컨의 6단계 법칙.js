const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, M] = input.shift().trim().split(" ").map(Number);
const graph = Array.from(Array(N), () => Array(N).fill(Infinity));
input.forEach((line) => {
  const [peopleA, peopleB] = line.trim().split(" ").map(Number);
  graph[peopleA - 1][peopleB - 1] = graph[peopleB - 1][peopleA - 1] = 1;
});

for (let from = 0; from < N; from++) {
  for (let via = 0; via < N; via++) {
    for (let to = 0; to < N; to++) {
      if (from === to) {
        graph[from][to] = 0;
        continue;
      }
      graph[from][to] = graph[to][from] = Math.min(
        graph[from][to],
        graph[from][via] + graph[to][via]
      );
    }
  }
}

const sixDegrees = graph.map((row) => row.reduce((acc, cur) => acc + cur, 0));
const min = Math.min(...sixDegrees);
console.log(sixDegrees.findIndex((value) => value === min) + 1);
