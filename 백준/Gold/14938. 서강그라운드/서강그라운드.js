const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, m, item, edge) {
  const distance = floyd(n, edge);

  let max = 0;
  for (let src = 1; src < n + 1; src++) {
    let curItem = 0;
    for (let dest = 1; dest < n + 1; dest++) {
      if (m < distance[src][dest]) {
        continue;
      }
      curItem += item[dest];
    }
    max = Math.max(max, curItem);
  }

  return max;
}

function floyd(n, edge) {
  const distance = Array.from(Array(n + 1), () => Array(n + 1).fill(Infinity));
  edge.forEach(([a, b, l]) => {
    distance[a][b] = l;
    distance[b][a] = l;
  });

  for (let i = 1; i < n + 1; i++) {
    distance[i][i] = 0;
  }

  for (let via = 1; via < n + 1; via++) {
    for (let src = 1; src < n + 1; src++) {
      for (let dest = 1; dest < n + 1; dest++) {
        if (distance[src][via] + distance[via][dest] < distance[src][dest]) {
          distance[src][dest] = distance[src][via] + distance[via][dest];
        }
      }
    }
  }
  return distance;
}

const [n, m, r] = input.shift().trim().split(" ").map(Number);
const item = input.shift().trim().split(" ").map(Number);
const edge = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(n, m, [0, ...item], edge));
