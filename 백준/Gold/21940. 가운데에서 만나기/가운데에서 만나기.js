const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, edge, K, living) {
  const distance = floyd(N, edge);
  const answer = [];
  let min = Infinity;

  for (let party = 1; party < N + 1; party++) {
    let max = 0;
    for (const friend of living) {
      max = Math.max(distance[friend][party] + distance[party][friend], max);
    }

    if (min < max) {
      continue;
    }

    if (max < min) {
      answer.length = 0;
      min = max;
    }
    answer.push(party);
  }

  return answer.sort((a, b) => a - b).join(" ");
}

function floyd(N, edge) {
  const distance = Array.from(Array(N + 1), () => Array(N + 1).fill(Infinity));
  for (let i = 1; i < N + 1; i++) {
    distance[i][i] = 0;
  }
  edge.forEach(([a, b, t]) => (distance[a][b] = t));

  for (let via = 1; via < N + 1; via++) {
    for (let src = 1; src < N + 1; src++) {
      for (let dest = 1; dest < N + 1; dest++) {
        if (distance[src][via] + distance[via][dest] < distance[src][dest]) {
          distance[src][dest] = distance[src][via] + distance[via][dest];
        }
      }
    }
  }

  return distance;
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const edge = input.splice(0, M).map((row) => row.split(" ").map(Number));
const K = Number(input.shift().trim());
const living = input[0].trim().split(" ").map(Number);
console.log(solution(N, edge, K, living));
