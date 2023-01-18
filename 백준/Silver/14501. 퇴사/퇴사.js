const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, meeting) {
  const prev = Array(N + 1).fill(-1);
  const max = Array(N + 1).fill(0);

  for (let index = 0; index < meeting.length; index++) {
    if (max[index] < (max[index - 1] ?? 0)) {
      prev[index] = prev[index - 1];
      max[index] = max[index - 1];
    }

    const [t, p] = meeting[index];
    if (t === 1) {
      prev[index] = index;
      max[index] += p;
      continue;
    }

    const endT = index + t;
    const sumP = max[index] + p;
    if (N < endT || sumP < max[endT]) {
      continue;
    }

    prev[endT] = index;
    max[endT] = sumP;
  }

  return Math.max(max[N], max[N - 1]);
}

const N = Number(input.shift().trim());
const meeting = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, meeting));
