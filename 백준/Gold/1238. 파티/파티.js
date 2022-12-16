const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, M, party] = input.shift().trim().split(" ").map(Number);

const createGraph = (n) => {
  return Array.from(Array(n + 1), (_, rowIndex) =>
    Array(n + 1)
      .fill(Infinity)
      .map((col, colIndex) => (rowIndex === colIndex ? 0 : col))
  );
};

const graph = createGraph(N);
const backwardGraph = createGraph(N);
input.map((line) => {
  const [townA, townB, distance] = line.trim().split(" ").map(Number);
  graph[townA][townB] = distance;
  backwardGraph[townB][townA] = distance;
});

const dijkstra = (start, graph) => {
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

const forwardDistance = dijkstra(party, graph);
const backwardDistance = dijkstra(party, backwardGraph);

console.log(
  Math.max(
    ...forwardDistance
      .map((distance, town) => distance + backwardDistance[town])
      .slice(1)
  )
);
