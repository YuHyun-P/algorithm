const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, M, party] = input.shift().trim().split(" ").map(Number);
const graph = Array.from(Array(N + 1), (_, rowIndex) =>
  Array(N + 1)
    .fill(Infinity)
    .map((col, colIndex) => (rowIndex === colIndex ? 0 : col))
);
input.map((line) => {
  const [townA, townB, distance] = line.trim().split(" ").map(Number);
  graph[townA][townB] = distance;
});

const dijkstra = (start) => {
  const distance = [...graph[start]];
  const visited = Array(N + 1).fill(false);
  visited[0] = visited[start] = true;

  while (true) {
    let minIndex = -1;
    for (let vertex = 1; vertex < N + 1; vertex++) {
      if (visited[vertex]) {
        continue;
      }

      if (minIndex < 0 && !visited[vertex]) {
        minIndex = vertex;
        continue;
      }

      if (distance[vertex] < distance[minIndex]) {
        minIndex = vertex;
      }
    }

    if (minIndex < 0) {
      break;
    }

    for (let vertex = 1; vertex < N + 1; vertex++) {
      distance[vertex] = Math.min(
        distance[vertex],
        distance[minIndex] + graph[minIndex][vertex]
      );
    }
    visited[minIndex] = true;
  }

  return distance;
};

const total = dijkstra(party);
for (let town = 1; town < N + 1; town++) {
  if (town === party) {
    continue;
  }

  const distance = dijkstra(town);
  total[town] += distance[party];
}

console.log(Math.max(...total.slice(1)));
