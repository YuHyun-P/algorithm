const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, nPeople, edge) {
  const PAD = 1;

  let min = Infinity;
  const graph = edge.map(([n, ...adjacent]) =>
    adjacent.map((index) => index - PAD)
  );

  const sum = (acc, cur) => acc + nPeople[cur];
  const getCombinations = (base, limit, pick) => {
    if (pick === 1)
      return Array.from(Array(limit - base), (_, i) => [i + base]);

    const combinations = [];
    for (let i = base; i < limit; i++) {
      const rest = getCombinations(i + 1, limit, pick - 1);
      rest.forEach((combination) => combinations.push([i, ...combination]));
    }
    return combinations;
  };
  const isConnected = (indices) => {
    let head = 0;
    const queue = [];
    const visited = Array(N).fill(false);
    queue.push(indices[0]);
    visited[indices[0]] = true;

    while (queue.length - head) {
      const cur = queue[head++];
      for (const next of graph[cur]) {
        if (visited[next]) continue;
        if (!indices.includes(next)) continue;

        visited[next] = true;
        queue.push(next);
      }
    }

    return indices.length === queue.length;
  };

  for (let pick = 1; pick <= N / 2; pick++) {
    const combinations = getCombinations(0, N, pick);
    for (const combination of combinations) {
      if (!isConnected(combination)) continue;
      const opposite = Array.from(Array(N), (_, i) => i).filter(
        (city) => !combination.includes(city)
      );
      if (!isConnected(opposite)) continue;

      const diff = Math.abs(
        combination.reduce(sum, 0) - opposite.reduce(sum, 0)
      );
      min = Math.min(min, diff);
    }
  }

  return min === Infinity ? -1 : min;
}

const N = Number(input.shift());
const nPeople = input.shift().split(" ").map(Number);
const edge = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, nPeople, edge));
