const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, nPeople, edge) {
  const PAD = 1;

  let minDiff = Infinity;
  const total = nPeople.reduce((acc, cur) => acc + cur, 0);
  const graph = edge.map((row) => {
    const [n, ...adjacent] = row.split(" ").map((index) => Number(index) - PAD);
    return adjacent;
  });

  const getCombinations = (base, limit, pick) => {
    if (pick === 1)
      return Array.from(Array(limit - base), (_, i) => [base + i]);

    const combinations = [];
    for (let i = base; i < limit; i++) {
      const rest = getCombinations(i + 1, limit, pick - 1);
      rest.forEach((combination) => combinations.push([i, ...combination]));
    }
    return combinations;
  };
  const isConnected = (nTarget, target) => {
    const start = target.findIndex((selected) => selected);

    let head = 0;
    const queue = [start];
    const visited = Array(N).fill(false);
    visited[start] = true;

    while (queue.length - head) {
      const cur = queue[head++];
      for (const next of graph[cur]) {
        if (visited[next]) continue;
        if (!target[next]) continue;

        visited[next] = true;
        queue.push(next);
      }
    }

    return queue.length === nTarget;
  };

  for (let pick = 1; pick <= N / 2; pick++) {
    const combinations = getCombinations(0, N, pick);
    for (const combination of combinations) {
      const districtA = Array(N).fill(false);
      const districtB = Array(N).fill(true);
      combination.forEach((index) => {
        districtA[index] = true;
        districtB[index] = false;
      });

      if (!isConnected(pick, districtA)) continue;
      if (!isConnected(N - pick, districtB)) continue;

      const nPeopleA = combination.reduce(
        (acc, index) => acc + nPeople[index],
        0
      );
      const nPeopleB = total - nPeopleA;
      minDiff = Math.min(minDiff, Math.abs(nPeopleA - nPeopleB));
    }
  }

  return minDiff !== Infinity ? minDiff : -1;
}

const N = Number(input.shift());
const nPeople = input.shift().split(" ").map(Number);
console.log(solution(N, nPeople, input));
