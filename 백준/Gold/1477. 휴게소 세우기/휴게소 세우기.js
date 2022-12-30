const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(M, L, restArea) {
  restArea.sort((a, b) => a - b);
  const distance = [...restArea, L]
    .map((cur, index) => cur - (restArea[index - 1] ?? 0))
    .sort((a, b) => b - a);
  const count = Array(distance.length).fill(0);
  const cur = [...distance];

  let maxIndex = 0;
  while (M) {
    count[maxIndex] += 1;
    M -= 1;
    cur[maxIndex] = Math.ceil(distance[maxIndex] / (count[maxIndex] + 1));
    for (let index = 0; index < cur.length; index++) {
      if (cur[index] >= cur[maxIndex]) {
        maxIndex = index;
      }
    }
  }

  return cur[maxIndex];
}

const [N, M, L] = input.shift().trim().split(" ").map(Number);
const restArea = (input[0] ?? "").trim().split(" ").map(Number);
console.log(solution(M, L, restArea));
