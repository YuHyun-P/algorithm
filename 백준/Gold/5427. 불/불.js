const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(testCase) {
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  const getMin = ([[w, h], board]) => {
    const outOfBound = (r, c) => r < 0 || h <= r || c < 0 || w <= c;

    const fire = Array.from(Array(h), () => Array(w).fill(-1));
    const firePosition = [];
    const sangGeun = Array.from(Array(h), () => Array(w).fill(-1));
    const sangGeunPosition = [];

    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        if (board[r][c] === "*") {
          firePosition.push([r, c]);
        }
        if (board[r][c] === "@") {
          sangGeunPosition.push([r, c]);
        }
      }
    }

    let head = 0;
    const queue = [...firePosition];
    queue.forEach(([r, c]) => (fire[r][c] = 0));
    while (queue.length - head) {
      const [row, col] = queue[head++];

      for (let move = 0; move < dr.length; move++) {
        const nextRow = row + dr[move];
        const nextCol = col + dc[move];

        if (
          outOfBound(nextRow, nextCol) ||
          board[nextRow][nextCol] === "#" ||
          fire[nextRow][nextCol] !== -1
        ) {
          continue;
        }

        fire[nextRow][nextCol] = fire[row][col] + 1;
        queue.push([nextRow, nextCol]);
      }
    }

    let min = Infinity;
    head = 0;
    queue.length = 0;
    queue.push(sangGeunPosition[0]);
    queue.forEach(([r, c]) => (sangGeun[r][c] = 0));

    while (queue.length - head && min === Infinity) {
      const [row, col] = queue[head++];

      for (let move = 0; move < dr.length; move++) {
        const nextRow = row + dr[move];
        const nextCol = col + dc[move];

        if (outOfBound(nextRow, nextCol)) {
          min = sangGeun[row][col] + 1;
          break;
        }

        if (
          board[nextRow][nextCol] !== "." ||
          sangGeun[nextRow][nextCol] !== -1 ||
          (fire[nextRow][nextCol] !== -1 &&
            fire[nextRow][nextCol] <= sangGeun[row][col] + 1)
        ) {
          continue;
        }

        sangGeun[nextRow][nextCol] = sangGeun[row][col] + 1;
        queue.push([nextRow, nextCol]);
      }
    }

    return min !== Infinity ? min : "IMPOSSIBLE";
  };

  return testCase.map(getMin);
}

const T = Number(input.shift());
const testCase = [];
for (let t = 0; t < T; t++) {
  const [w, h] = input.shift().trim().split(" ").map(Number);
  const board = input.splice(0, h).map((row) => row.trim().split(""));
  testCase.push([[w, h], board]);
}
console.log(solution(testCase).join("\n"));
