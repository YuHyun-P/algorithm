const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, apples, rotates) {
  const LEFT = "L";
  const RIGHT = "D";

  const visitTime = Array.from(Array(N), () => Array(N).fill(-1));
  const isApple = init(N, apples);
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  let x = 0;
  let y = 0;
  let t = 0;
  let snakeLength = 1;
  let direction = 0;
  let rotatesIndex = 0;

  const outOfBound = (x, y) => x < 0 || y < 0 || N <= x || N <= y;
  const inCollision = (x, y) =>
    visitTime[x][y] !== -1 && t - visitTime[x][y] <= snakeLength;
  const canMove = (x, y) => !outOfBound(x, y) && !inCollision(x, y);

  visitTime[x][y] = 0;

  while (true) {
    if (rotatesIndex < rotates.length) {
      const [time, to] = rotates[rotatesIndex];
      if (t === Number(time)) {
        rotatesIndex += 1;
        if (to === LEFT) direction = (direction - 1 + dx.length) % dx.length;
        else direction = (direction + 1 + dx.length) % dx.length;
      }
    }

    const nextX = x + dx[direction];
    const nextY = y + dy[direction];
    t += 1;

    if (!canMove(nextX, nextY)) break;

    if (isApple[nextX][nextY]) {
      isApple[nextX][nextY] = false;
      snakeLength += 1;
    }
    visitTime[nextX][nextY] = visitTime[x][y] + 1;
    x = nextX;
    y = nextY;
  }

  return t;
}

function init(N, apples) {
  const isApple = Array.from(Array(N), () => Array(N).fill(false));
  for (const [x, y] of apples) {
    isApple[x][y] = true;
  }
  return isApple;
}

const N = Number(input.shift());
const K = Number(input.shift());
const apples = input.splice(0, K).map((row) =>
  row
    .trim()
    .split(" ")
    .map((char) => Number(char) - 1)
);
const L = Number(input.shift());
const rotates = input.splice(0, L).map((row) => row.trim().split(" "));

console.log(solution(N, apples, rotates));
