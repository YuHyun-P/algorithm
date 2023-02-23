const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, query) {
  const X = 0;
  const Y = 1;
  let total = 0;
  let lastY = 0;

  query.sort((a, b) => a[X] - b[X] || a[Y] - b[Y]);
  total += query[0][Y] - query[0][X];
  lastY = query[0][Y];

  for (let index = 1; index < N; index++) {
    const [curX, curY] = query[index];

    if (curX <= lastY) {
      total += Math.max(0, curY - lastY);
      lastY = Math.max(lastY, curY);
      continue;
    }

    total += curY - curX;
    lastY = curY;
  }

  return total;
}

let cursor = 0;
const N = Number(input[cursor++].trim());
const query = [];
while (cursor < N + 1) {
  query.push(input[cursor++].trim().split(" ").map(Number));
}
console.log(solution(N, query));
