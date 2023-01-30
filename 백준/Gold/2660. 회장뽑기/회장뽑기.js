const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, edge) {
  const distance = init(N, edge);
  floydWarshall(N, distance);
  const president = [];
  let min = Infinity;

  for (let i = 1; i < N + 1; i++) {
    let cur = 0;
    for (let j = 1; j < N + 1; j++) {
      if (i === j) continue;
      cur = Math.max(cur, distance[i][j]);
    }

    if (min < cur) continue;
    if (min > cur) president.length = 0;
    president.push(i);
    min = cur;
  }

  return `${min} ${president.length}\n${president.join(" ")}`;
}

function init(N, edge) {
  const distance = Array.from(Array(N + 1), (_, index) => {
    const row = Array(N + 1).fill(Infinity);
    row[index] = 0;
    return row;
  });

  edge.forEach((row) => {
    const [a, b] = row.split(" ").map(Number);
    distance[a][b] = distance[b][a] = 1;
  });

  return distance;
}

function floydWarshall(N, distance) {
  for (let via = 1; via < N + 1; via++) {
    for (let start = 1; start < N + 1; start++) {
      for (let end = 1; end < N + 1; end++) {
        distance[start][end] = Math.min(
          distance[start][via] + distance[via][end],
          distance[start][end]
        );
      }
    }
  }
}

const N = Number(input.shift());
input.pop();
console.log(solution(N, input));
