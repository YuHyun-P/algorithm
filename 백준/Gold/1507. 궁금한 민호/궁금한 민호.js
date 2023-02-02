const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, distance) {
  let answer = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      let isDirect = true;
      for (let k = 0; k < N && isDirect; k++) {
        if (k === i || k === j) continue;
        const direct = distance[i][j];
        const indirect = distance[i][k] + distance[k][j];

        if (direct === indirect) isDirect = false;
        if (direct > indirect) return -1;
      }
      if (isDirect) answer += distance[i][j];
    }
  }

  return answer;
}

const N = Number(input.shift());
const distance = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, distance));
