const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K) {
  const visited = Array(K + 1).fill(false);
  for (let i = 2; i <= N; i++) {
    for (let j = 1; i * j <= N; j++) {
      if (visited[i * j]) {
        continue;
      }

      visited[i * j] = true;
      K--;
      if (K === 0) {
        return i * j;
      }
    }
  }

  return -1;
}

const [N, K] = input[0].trim().split(" ").map(Number);
console.log(solution(N, K));
