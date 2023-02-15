const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, k, positions, directions, priorities) {
  const LIMIT = 1000;
  const dx = [0, -1, 1, 0, 0];
  const dy = [0, 0, 0, -1, 1];

  let t = 0;
  let sharkNum = M;
  const smell = Array.from(Array(N), () => Array(N).fill(-1));
  const baseTime = Array.from(Array(N), () => Array(N).fill(-Infinity));
  const inBoard = Array(M + 1).fill(true);

  for (let shark = 1; shark < M + 1; shark++) {
    const [x, y] = positions[shark];
    smell[x][y] = shark;
    baseTime[x][y] = 0;
  }

  const outOfBound = (x, y) => x < 0 || y < 0 || N <= x || N <= y;
  const isEmpty = (x, y, curT) => baseTime[x][y] + k < curT + 1;
  const isMySmell = (shark, x, y, curT) =>
    smell[x][y] === shark && baseTime[x][y] + k >= curT + 1;
  const move = (curT) => {
    let removed = 0;
    const updated = [];

    for (let shark = 1; shark < M + 1; shark++) {
      if (!inBoard[shark]) continue;

      const [x, y] = positions[shark];
      const dir = directions[shark];
      const priority = priorities[shark][dir];

      let emptySmell = null;
      let mySmell = null;
      for (const nextDir of priority) {
        const nextX = x + dx[nextDir];
        const nextY = y + dy[nextDir];

        if (outOfBound(nextX, nextY)) continue;
        if (isEmpty(nextX, nextY, curT)) {
          emptySmell = [nextDir, nextX, nextY];
          break;
        }
        if (isMySmell(shark, nextX, nextY, curT) && mySmell === null) {
          mySmell = [nextDir, nextX, nextY];
        }
      }

      const [nextDir, nextX, nextY] = emptySmell ? emptySmell : mySmell;
      positions[shark] = [nextX, nextY];
      directions[shark] = nextDir;
      updated.push([shark, nextX, nextY]);
    }

    for (const [shark, nextX, nextY] of updated) {
      if (baseTime[nextX][nextY] === curT + 1) {
        inBoard[shark] = false;
        removed += 1;
        continue;
      }

      smell[nextX][nextY] = shark;
      baseTime[nextX][nextY] = curT + 1;
    }

    return removed;
  };

  while (sharkNum > 1 && t < LIMIT) {
    sharkNum -= move(t);
    t += 1;
  }

  return sharkNum === 1 ? t : -1;
}

let cursor = 0;
const [N, M, k] = input[cursor++].split(" ").map(Number);
const positions = Array(M + 1).fill(null);
const priorities = Array(M + 1).fill(null);

for (let x = 0; x < N; x++) {
  const row = input[cursor++].trim().split(" ");
  for (let y = 0; y < N; y++) {
    if (row[y] === "0") continue;
    positions[Number(row[y])] = [x, y];
  }
}

const directions = input[cursor++].trim().split(" ").map(Number);
directions.unshift(null);

for (let shark = 1; shark < M + 1; shark++) {
  const up = input[cursor++].trim().split(" ").map(Number);
  const down = input[cursor++].trim().split(" ").map(Number);
  const left = input[cursor++].trim().split(" ").map(Number);
  const right = input[cursor++].trim().split(" ").map(Number);
  priorities[shark] = [null, up, down, left, right];
}

console.log(solution(N, M, k, positions, directions, priorities));
