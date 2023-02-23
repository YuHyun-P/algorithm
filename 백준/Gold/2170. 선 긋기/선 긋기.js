const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, query) {
  const X = 0;
  const Y = 1;
  const lines = [];

  query.sort((a, b) => a[X] - b[X] || a[Y] - b[Y]);
  lines.push(query[0]);

  for (let index = 1; index < N; index++) {
    const [lastX, lastY] = lines.at(-1);
    const [curX, curY] = query[index];

    if (curX <= lastY && curY > lastY) lines.at(-1)[Y] = curY;
    if (curX > lastY) lines.push([curX, curY]);
  }

  return lines.reduce((acc, cur) => acc + cur[Y] - cur[X], 0);
}

let cursor = 0;
const N = Number(input[cursor++].trim());
const query = [];
while (cursor < N + 1) {
  query.push(input[cursor++].trim().split(" ").map(Number));
}
console.log(solution(N, query));
