/* 입력 */
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = parseInt(input[0], 10);
const map = [];
for (let line = 1; line < input.length; line++) {
  map.push(input[line].trim().split("").map(Number));
}

/* 풀이 */
const HOUSE = 1;

// right down left up
const DIRECTION = 4;
const dr = [1, 0, -1, 0];
const dc = [0, -1, 0, 1];

const complexCounts = [];
const visited = Array.from(Array(N), () => Array(N).fill(false));

const isValid = (r, c) => 0 <= r && r < N && 0 <= c && c < N;
const isHouse = (r, c) => map[r][c] === HOUSE;

map.forEach((row, r) => {
  row.forEach((cell, c) => {
    if (visited[r][c] || cell !== HOUSE) return;

    const complexNum = complexCounts.length;
    let count = 0;
    const stack = [[r, c]];
    visited[r][c] = true;

    while (stack.length > 0) {
      const [curR, curC] = stack.pop();
      count++;

      for (let index = 0; index < DIRECTION; index++) {
        const nextR = curR + dr[index];
        const nextC = curC + dc[index];

        const isConnected =
          isValid(nextR, nextC) &&
          isHouse(nextR, nextC) &&
          !visited[nextR][nextC];
        if (!isConnected) continue;

        stack.push([nextR, nextC]);
        visited[nextR][nextC] = true;
      }
    }

    complexCounts[complexNum] = count;
  });
});

complexCounts.sort((a, b) => a - b);

/* 출력 */
console.log(complexCounts.length);
complexCounts.forEach((count) => console.log(count));
