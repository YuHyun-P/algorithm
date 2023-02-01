const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

let cursor = 0;
const [n, m] = input[cursor++].split(" ").map(Number);

const changed = Array.from(Array(n + 1), () => Array(n + 1).fill(Infinity));
for (let v = 1; v < n + 1; v++) {
  changed[v][v] = 0;
}

for (let iter = 0; iter < m; iter++) {
  const [u, v, b] = input[cursor++].split(" ").map(Number);
  changed[u][v] = 0;
  changed[v][u] = b === 0 ? 1 : 0;
}

for (let via = 1; via < n + 1; via++) {
  for (let start = 1; start < n + 1; start++) {
    for (let end = 1; end < n + 1; end++) {
      changed[start][end] = Math.min(
        changed[start][end],
        changed[start][via] + changed[via][end]
      );
    }
  }
}

let k = Number(input[cursor++]);
while (k) {
  const [s, e] = input[cursor++].split(" ").map(Number);
  console.log(changed[s][e]);
  k -= 1;
}
