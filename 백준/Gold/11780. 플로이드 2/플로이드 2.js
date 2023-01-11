const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, edge) {
  const [min, nxt] = init(n, edge);
  const totalPath = [];
  let answer = "";

  floyd(min, nxt);

  for (let src = 1; src < n + 1; src++) {
    for (let dest = 1; dest < n + 1; dest++) {
      const path = restorePath(src, dest, nxt);
      totalPath.push(
        path.length === 0 ? "0" : [path.length, ...path].join(" ")
      );
    }
  }

  for (let src = 1; src < n + 1; src++) {
    for (let dest = 1; dest < n + 1; dest++) {
      answer += (min[src][dest] !== Infinity ? min[src][dest] : 0) + " ";
    }
    answer = answer.trimEnd() + "\n";
  }
  return answer + totalPath.join("\n");
}

function init(n, edge) {
  const min = Array.from(Array(n + 1), (_, index) => {
    const row = Array(n + 1).fill(Infinity);
    row[index] = 0;
    return row;
  });
  const nxt = Array.from(Array(n + 1), () => Array(n + 1).fill(-1));
  edge.forEach(([a, b, c]) => {
    if (c < min[a][b]) {
      min[a][b] = c;
      nxt[a][b] = b;
    }
  });
  return [min, nxt];
}

function floyd(min, nxt) {
  for (let via = 1; via < n + 1; via++) {
    for (let src = 1; src < n + 1; src++) {
      for (let dest = 1; dest < n + 1; dest++) {
        if (min[src][via] + min[via][dest] < min[src][dest]) {
          min[src][dest] = min[src][via] + min[via][dest];
          nxt[src][dest] = nxt[src][via];
        }
      }
    }
  }
}

function restorePath(src, dest, nxt) {
  if (nxt[src][dest] === -1) {
    return [];
  }

  const path = [];
  let cur = src;
  while (cur !== dest) {
    path.push(cur);
    cur = nxt[cur][dest];
  }
  path.push(dest);

  return path;
}

const n = Number(input.shift().trim());
const m = Number(input.shift().trim());
const edge = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(n, edge));
