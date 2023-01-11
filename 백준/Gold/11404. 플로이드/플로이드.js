const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, m, edge) {
  const min = Array.from(Array(n), () => Array(n).fill(Infinity));
  edge.forEach(([a, b, c]) => {
    if (c < min[a - 1][b - 1]) {
      min[a - 1][b - 1] = c;
    }
  });

  for (let via = 0; via < n; via++) {
    for (let src = 0; src < n; src++) {
      for (let dest = 0; dest < n; dest++) {
        if (src === dest) {
          min[src][dest] = 0;
          continue;
        }
        if (min[src][via] + min[via][dest] < min[src][dest]) {
          min[src][dest] = min[src][via] + min[via][dest];
        }
      }
    }
  }

  for (let src = 0; src < n; src++) {
    for (let dest = 0; dest < n; dest++) {
      if (min[src][dest] === Infinity) {
        min[src][dest] = 0;
      }
    }
    min[src] = min[src].join(" ");
  }

  return min.join("\n");
}

const n = Number(input.shift().trim());
const m = Number(input.shift().trim());
const edge = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(n, m, edge));
