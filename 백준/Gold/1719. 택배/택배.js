const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, m, edge) {
  const PAD = 1;

  let answer = "";
  const distance = Array.from(Array(n + PAD), () =>
    Array(n + PAD).fill(Infinity)
  );
  const next = Array.from(Array(n + PAD), () => Array(n + PAD).fill(Infinity));

  for (let v = 0; v < n; v++) distance[v][v] = 0;
  edge.forEach(([u, v, w]) => {
    distance[u][v] = distance[v][u] = w;
    next[u][v] = v;
    next[v][u] = u;
  });

  for (let k = PAD; k < n + PAD; k++) {
    for (let i = PAD; i < n + PAD; i++) {
      for (let j = i + 1; j < n + PAD; j++) {
        if (distance[i][k] + distance[k][j] < distance[i][j]) {
          distance[i][j] = distance[j][i] = distance[i][k] + distance[k][j];
          next[i][j] = next[i][k];
          next[j][i] = next[j][k];
        }
      }
    }
  }

  for (let i = PAD; i < n + PAD; i++) {
    for (let j = PAD; j < n + PAD; j++) {
      answer += `${next[i][j] === Infinity ? "-" : next[i][j]} `;
    }
    answer.trim();
    answer += "\n";
  }

  return answer.trim();
}

const [n, m] = input.shift().split(" ").map(Number);
const edge = input.map((row) => row.split(" ").map(Number));
console.log(solution(n, m, edge));
